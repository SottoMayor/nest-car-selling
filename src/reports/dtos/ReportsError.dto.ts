export class InternalServerErrorDto {
     /**
     * Error status code
     * @example 500
    */
    statusCode: number

    /**
     * Error message
     * @example "Impossible to get vehicle data, try again later."
    */
    message: string

    /**
     * Error type
     * @example "Internal Server Error"
    */
    error: string
}

export class BadRequestDto {
    /**
    * Error status code
    * @example 400
   */
   statusCode: number

   /**
    * Error message
    * @example "'Call this endpoint just if you wanna approve a report."
   */
   message: string

   /**
    * Error type
    * @example "Bad Request"
   */
   error: string
}

export class NotFoundDto {
    /**
     * Error status code
     * @example 404 
    */
    statusCode: number

    /**
     * Error message
     * @example "This report does not exist."
    */
    message: string

    /**
     * Error type
     * @example "Not found"
    */
    error: string
}