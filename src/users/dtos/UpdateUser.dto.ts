import { IsString, IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";

export class UpdateUser {
     /**
     * The user should pass a new email address
     * @example 'new_email@test.com'
    */
    @IsOptional()
    @IsString({ message: 'The email must be a string' })
    @IsNotEmpty({ message: 'The email cannot be empty.'})
    @IsEmail({ message: 'The email must be valid'})
    email?: string;

    /**
     * The user should pass a new password
     * @example 'new_super_secretPassword!!!'
    */
    @IsOptional()
    @IsString({ message: 'The password must be a string' })
    @IsNotEmpty({ message: 'The password cannot be empty.'})
    @Length(6, 1000, { message: 'The password must be at least 6 characters.' })
    password?: string;
}