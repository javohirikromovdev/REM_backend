import { IsEmail, Matches } from 'class-validator'

export class SendCodeDto {
  @IsEmail()
  email: string
}

export class VerifyCodeDto {
  @IsEmail()
  email: string

  @Matches(/^\d{6}$/, { message: 'Code must be 6 digits' })
  code: string
}
