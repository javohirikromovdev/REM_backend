import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service.js'
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { EmailVerificationService } from './email-verification.service.js';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailVerification: EmailVerificationService
  ) { }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto

    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    await this.emailVerification.assertVerified(email)

    const hash = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullName,
        email: registerDto.email,
        phone: registerDto.phone,
        passwordHash: hash
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    })

    await this.emailVerification.consume(email)
    return user
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    const ok = await bcrypt.compare(password, user?.passwordHash ?? '')

    if (!user || !ok) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user?.email,
      role: user?.role
    })

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    }
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    })

    if(!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}