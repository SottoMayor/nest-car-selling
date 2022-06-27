import { Transform } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsInt, IsPositive, IsAlpha, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class GetEstimateDto {
    /**
     * The manufacturer which built the car
     * @example honda
    */
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    make: string;

    /**
     * The model car
     * @example civic
    */
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    model: string;

     /**
     * The year which the car was built
     * @example 2020
    */
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(2000)
    year: number;
    
    /**
     * The total amount of mileage that the car toured
     * @example 10000
    */
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    mileage: number;
    
    /**
     * The total amount of longitute distance available to search cars.
     * @example 100
    */
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    @IsLongitude()
    lng: number;
    
     /**
     * The total amount of latitude distance available to search cars.
     * @example 100
    */
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    @IsLatitude()
    lat: number;
}