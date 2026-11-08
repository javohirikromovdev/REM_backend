import { BadRequestException, ConflictException, HttpException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { DAILY_SEND_LIMIT, EmailVerificationService, MAX_ATTEMPTS } from './email-verification.service.js'

function setup() {
  const prisma = {
    user: { findUnique: vi.fn() },
    emailVerification: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn().mockResolvedValue({}),
    },
  }
  const mailer = { send: vi.fn().mockResolvedValue({ messageId: '1', accepted: [], attempts: 1 }) }
  const service = new EmailVerificationService(prisma as never, mailer as never)
  return { prisma, mailer, service }
}

describe('EmailVerificationService', () => {
  it('rejects sending a code to an email that is already registered', async () => {
    const { prisma, service } = setup()
    prisma.user.findUnique.mockResolvedValue({ id: 1 })
    await expect(service.sendCode('a@b.uz')).rejects.toBeInstanceOf(ConflictException)
  })

  it('stores a hashed 6-digit code and emails it', async () => {
    const { prisma, mailer, service } = setup()
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.emailVerification.findUnique.mockResolvedValue(null)

    const res = await service.sendCode('a@b.uz')

    const sent = mailer.send.mock.calls[0][0]
    const code = /(\d{6})/.exec(sent.text)![1]
    const saved = prisma.emailVerification.upsert.mock.calls[0][0].create
    expect(sent.to).toBe('a@b.uz')
    expect(saved.codeHash).not.toContain(code)
    expect(await bcrypt.compare(code, saved.codeHash)).toBe(true)
    expect(res.expiresInSeconds).toBe(600)
  })

  it('refuses to resend within 60 seconds', async () => {
    const { prisma, service } = setup()
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.emailVerification.findUnique.mockResolvedValue({ verifiedAt: null, lastSentAt: new Date(), sendCount: 1, windowStartedAt: new Date() })
    await expect(service.sendCode('a@b.uz')).rejects.toBeInstanceOf(HttpException)
  })

  it('allows at most 5 codes per 24 hours', async () => {
    const { prisma, mailer, service } = setup()
    prisma.user.findUnique.mockResolvedValue(null)
    const longAgo = new Date(Date.now() - 2 * 60_000)
    prisma.emailVerification.findUnique.mockResolvedValue({ verifiedAt: null, lastSentAt: longAgo, sendCount: DAILY_SEND_LIMIT, windowStartedAt: new Date(Date.now() - 3600_000) })
    await expect(service.sendCode('a@b.uz')).rejects.toThrow('Daily code limit reached')
    expect(mailer.send).not.toHaveBeenCalled()
  })

  it('resets the daily counter after 24 hours and reports remaining sends', async () => {
    const { prisma, service } = setup()
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.emailVerification.findUnique.mockResolvedValue({ verifiedAt: null, lastSentAt: new Date(Date.now() - 25 * 3600_000), sendCount: DAILY_SEND_LIMIT, windowStartedAt: new Date(Date.now() - 25 * 3600_000) })
    const res = await service.sendCode('a@b.uz')
    expect(res.remainingSends).toBe(DAILY_SEND_LIMIT - 1)
    expect(prisma.emailVerification.upsert.mock.calls[0][0].update.sendCount).toBe(1)
  })

  it('counts a wrong code as a failed attempt', async () => {
    const { prisma, service } = setup()
    prisma.emailVerification.findUnique.mockResolvedValue({
      codeHash: await bcrypt.hash('123456', 4),
      expiresAt: new Date(Date.now() + 60_000),
      attempts: 0,
      verifiedAt: null,
    })
    await expect(service.verifyCode('a@b.uz', '000000')).rejects.toThrow('Invalid code')
    expect(prisma.emailVerification.update).toHaveBeenCalledWith({ where: { email: 'a@b.uz' }, data: { attempts: { increment: 1 } } })
  })

  it('marks the email verified for the correct code', async () => {
    const { prisma, service } = setup()
    prisma.emailVerification.findUnique.mockResolvedValue({
      codeHash: await bcrypt.hash('123456', 4),
      expiresAt: new Date(Date.now() + 60_000),
      attempts: 0,
      verifiedAt: null,
    })
    await expect(service.verifyCode('a@b.uz', '123456')).resolves.toEqual({ verified: true })
    expect(prisma.emailVerification.update.mock.calls[0][0].data.verifiedAt).toBeInstanceOf(Date)
  })

  it('rejects expired codes and too many attempts', async () => {
    const { prisma, service } = setup()
    const hash = await bcrypt.hash('123456', 4)
    prisma.emailVerification.findUnique.mockResolvedValueOnce({ codeHash: hash, expiresAt: new Date(Date.now() - 1), attempts: 0, verifiedAt: null })
    await expect(service.verifyCode('a@b.uz', '123456')).rejects.toThrow('Code expired')
    prisma.emailVerification.findUnique.mockResolvedValueOnce({ codeHash: hash, expiresAt: new Date(Date.now() + 60_000), attempts: MAX_ATTEMPTS, verifiedAt: null })
    await expect(service.verifyCode('a@b.uz', '123456')).rejects.toThrow('Too many attempts')
  })

  it('requires a recent verification before registration', async () => {
    const { prisma, service } = setup()
    prisma.emailVerification.findUnique.mockResolvedValueOnce(null)
    await expect(service.assertVerified('a@b.uz')).rejects.toBeInstanceOf(BadRequestException)
    prisma.emailVerification.findUnique.mockResolvedValueOnce({ verifiedAt: new Date() })
    await expect(service.assertVerified('a@b.uz')).resolves.toBeUndefined()
  })
})
