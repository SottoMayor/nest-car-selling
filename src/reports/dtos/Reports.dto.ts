import { Expose, Transform } from "class-transformer";

export class ReportsDto {
    /**
     * The manufacturer which built the car
     * @example honda
    */
    @Expose()
    make: string;
    
    /**
     * The model car
     * @example civic
    */
    @Expose()
    model: string;
    
     /**
     * The year which the car was built
     * @example 2020
    */
    @Expose()
    year: number;
    
    /**
     * The total amount of mileage that the car toured
     * @example 10000
    */
    @Expose()
    mileage: number;

    /**
     * The total amount of longitute distance available to search cars.
     * @example 100
    */
    @Expose()
    lng: number;
    
     /**
     * The total amount of latitude distance available to search cars.
     * @example 100
    */
    @Expose()
    lat: number;
    
    /**
     * The car price.
     * @example 109000
    */
    @Expose()
    price: number;

    /**
     * The condition was approved.
     * @example true
    */
    @Expose()
    approved: boolean
    
    /**
     * The user id.
     * @example 1
    */
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}