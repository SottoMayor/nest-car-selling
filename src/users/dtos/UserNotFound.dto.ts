export class UserNotFoundDto {
    /**
     * Error status code
     * @example 404 
    */
    statusCode: number

    /**
     * Error message
     * @example "This user does not exist."
    */
    message: string

    /**
     * Error type
     * @example "Not found"
    */
    error: string
}