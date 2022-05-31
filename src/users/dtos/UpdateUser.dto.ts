import { IsString, IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";

export class UpdateUser {
    @IsOptional()
    @IsString({ message: 'The email must be a string' })
    @IsNotEmpty({ message: 'The email cannot be empty.'})
    @IsEmail({ message: 'The email must be valid'})
    email?: string;
    
    @IsOptional()
    @IsString({ message: 'The password must be a string' })
    @IsNotEmpty({ message: 'The password cannot be empty.'})
    @Length(6, 1000, { message: 'The password must be at least 6 characters.' })
    password?: string;
}