import { Controller, Get, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user/current-user.decorator.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { SendCodeDto, VerifyCodeDto } from './dto/email-verification.dto.js';
import { EmailVerificationService } from './email-verification.service.js';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailVerification: EmailVerificationService,
  ) {}

  // Ro'yxatdan o'tishdan oldin emailga 6 xonali kod yuborish
  @Post('email/send-code')
  @HttpCode(200)
  sendCode(@Body() dto: SendCodeDto) {
    return this.emailVerification.sendCode(dto.email)
  }

  // Emaildagi kodni tekshirish
  @Post('email/verify')
  @HttpCode(200)
  verifyCode(@Body() dto: VerifyCodeDto) {
    return this.emailVerification.verifyCode(dto.email, dto.code)
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser('id') userId: number) {
    return this.authService.me(userId)
  }
}
