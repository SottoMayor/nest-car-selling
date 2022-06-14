import { IsString, IsNumber, IsNotEmpty, IsInt, IsPositive, IsAlpha, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    make: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(2000)
    year: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    mileage: number;

    @IsNotEmpty()
    @IsLongitude()
    lng: number;

    @IsNotEmpty()
    @IsLatitude()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1000000)
    price: number;
}