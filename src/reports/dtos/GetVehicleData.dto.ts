import { IsDate, IsString, IsOptional, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"

export class GetVehicleDataDto {
    @Transform( ( { value } ) => new Date(value) )
    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    fromDate: Date
    
    @Transform( ( { value } ) => new Date(value) )
    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    toDate: Date
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    manufacturer:string
}