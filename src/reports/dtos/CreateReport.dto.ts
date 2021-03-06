import { IsString, IsNumber, IsNotEmpty, IsInt, IsPositive, IsAlpha, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class CreateReportDto {
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
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    mileage: number;

    /**
     * The total amount of longitute distance available to search cars.
     * @example 100
    */
    @IsNotEmpty()
    @IsLongitude()
    lng: number;

    /**
     * The total amount of latitude distance available to search cars.
     * @example 100
    */
    @IsNotEmpty()
    @IsLatitude()
    lat: number;

    /**
     * The car price.
     * @example 109000
    */
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    price: number;
}