import { IsNotEmpty, IsString, Length, IsEmail} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'The email cannot be empty.' })
    @IsString({ message: 'The email must be a string.'})
    @IsEmail({ message: 'Invalidy email address, try again!' })
    email: string;

    @IsNotEmpty({ message: 'The password cannot be empty.' })
    @IsString({ message: 'The password must be a string.'})
    @Length(6, 100, { message: 'Your password must be between 6 and 100 characters.' })
    password: string;
}