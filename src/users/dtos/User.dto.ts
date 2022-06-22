import { Expose } from "class-transformer";

export class UserDto {
    /**
     * The id of a given user.
     * @example 1
    */
   
    @Expose()
    id: number

     /**
     * The email address registered
     * @example 'test@test.com'
    */
    @Expose()
    email: string
}