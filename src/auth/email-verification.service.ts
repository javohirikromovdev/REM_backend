import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { Mailer } from '@nestjs/mail'
import { randomInt } from 'node:crypto'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service.js'

export const CODE_TTL_SECONDS = 10 * 60
export const RESEND_AFTER_SECONDS = 60
export const MAX_ATTEMPTS = 5
export const VERIFIED_WINDOW_SECONDS = 30 * 60
export const DAILY_SEND_LIMIT = 5
export const DAILY_WINDOW_SECONDS = 24 * 60 * 60

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name)

  constructor(
    private prisma: PrismaService,
    private mailer: Mailer,
  ) {}

  async sendCode(email: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    const now = Date.now()
    const existing = await this.prisma.emailVerification.findUnique({ where: { email } })

    if (existing?.lastSentAt && !existing.verifiedAt) {
      const elapsed = (now - existing.lastSentAt.getTime()) / 1000
      if (elapsed < RESEND_AFTER_SECONDS) {
        throw new HttpException(
          { statusCode: 429, message: 'Please wait before requesting a new code', retryAfterSeconds: Math.ceil(RESEND_AFTER_SECONDS - elapsed) },
          HttpStatus.TOO_MANY_REQUESTS,
        )
      }
    }

    const windowExpired = !existing || now - existing.windowStartedAt.getTime() >= DAILY_WINDOW_SECONDS * 1000
    const windowStartedAt = windowExpired ? new Date(now) : existing.windowStartedAt
    const sendCount = windowExpired ? 0 : existing.sendCount
    if (sendCount >= DAILY_SEND_LIMIT) {
      const retryAfterSeconds = Math.ceil((windowStartedAt.getTime() + DAILY_WINDOW_SECONDS * 1000 - now) / 1000)
      throw new HttpException(
        { statusCode: 429, message: 'Daily code limit reached', retryAfterSeconds, dailyLimit: DAILY_SEND_LIMIT },
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    const code = randomInt(0, 1_000_000).toString().padStart(6, '0')
    const codeHash = await bcrypt.hash(code, 10)
    const expiresAt = new Date(now + CODE_TTL_SECONDS * 1000)
    const data = { codeHash, expiresAt, attempts: 0, verifiedAt: null, sendCount: sendCount + 1, windowStartedAt, lastSentAt: new Date(now) }

    await this.prisma.emailVerification.upsert({
      where: { email },
      create: { email, ...data },
      update: data,
    })

    try {
      await this.mailer.send({
        to: email,
        subject: `REM: tasdiqlash kodi ${code}`,
        text: `Sizning REM tasdiqlash kodingiz: ${code}\nKod ${CODE_TTL_SECONDS / 60} daqiqa amal qiladi.\nAgar siz ro'yxatdan o'tmayotgan bo'lsangiz, bu xatni e'tiborsiz qoldiring.`,
        html: `<p>Sizning REM tasdiqlash kodingiz:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>Kod ${CODE_TTL_SECONDS / 60} daqiqa amal qiladi. Agar siz ro'yxatdan o'tmayotgan bo'lsangiz, bu xatni e'tiborsiz qoldiring.</p>`,
        retry: false,
      })
    } catch (error) {
      this.logger.error(`Verification email to ${email} failed: ${(error as Error).message}`)
      await this.prisma.emailVerification
        .update({ where: { email }, data: { sendCount: sendCount, lastSentAt: existing?.lastSentAt ?? null, expiresAt: new Date(0) } })
        .catch(() => undefined)
      throw new ServiceUnavailableException('Verification email could not be sent')
    }

    return {
      message: 'Verification code sent',
      expiresInSeconds: CODE_TTL_SECONDS,
      resendAfterSeconds: RESEND_AFTER_SECONDS,
      dailyLimit: DAILY_SEND_LIMIT,
      remainingSends: DAILY_SEND_LIMIT - (sendCount + 1),
    }
  }

  async verifyCode(email: string, code: string) {
    const record = await this.prisma.emailVerification.findUnique({ where: { email } })
    if (!record) {
      throw new BadRequestException('Code not found, request a new one')
    }
    if (record.verifiedAt) {
      return { verified: true }
    }
    if (record.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('Code expired, request a new one')
    }
    if (record.attempts >= MAX_ATTEMPTS) {
      throw new BadRequestException('Too many attempts, request a new code')
    }

    const ok = await bcrypt.compare(code, record.codeHash)
    if (!ok) {
      await this.prisma.emailVerification.update({ where: { email }, data: { attempts: { increment: 1 } } })
      throw new BadRequestException('Invalid code')
    }

    await this.prisma.emailVerification.update({ where: { email }, data: { verifiedAt: new Date() } })
    return { verified: true }
  }

  async assertVerified(email: string) {
    const record = await this.prisma.emailVerification.findUnique({ where: { email } })
    const fresh = record?.verifiedAt && Date.now() - record.verifiedAt.getTime() < VERIFIED_WINDOW_SECONDS * 1000
    if (!fresh) {
      throw new BadRequestException('Email is not verified')
    }
  }

  async consume(email: string) {
    await this.prisma.emailVerification.delete({ where: { email } }).catch(() => undefined)
  }
}
