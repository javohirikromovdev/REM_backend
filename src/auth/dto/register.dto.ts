import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { UZ_PHONE_MESSAGE, UZ_PHONE_REGEX } from "../../common/validation/uz-phone.js";

export class RegisterDto {

    @IsString({ message: 'Fullname must be a string'})
    @IsNotEmpty()
    fullName: string

    @IsEmail()
    email: string

    @IsString({ message: 'Password must be a string'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string

    @IsString({ message: 'Phone must be a string'})
    @Matches(UZ_PHONE_REGEX, { message: UZ_PHONE_MESSAGE })
    phone: string
}
