import { Transform } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsInt, IsPositive, IsAlpha, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class GetEstimateDto {
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    make: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(2000)
    year: number;
    
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    mileage: number;
    
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    @IsLongitude()
    lng: number;
    
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    @IsLatitude()
    lat: number;
}