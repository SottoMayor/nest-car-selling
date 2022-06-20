import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetVehicleDataDto } from './dtos/GetVehicleData.dto';

@Injectable()
export class VehicleDataService {
    constructor(private readonly httpService: HttpService, private configService: ConfigService){}

    public async getVehicleData(search: GetVehicleDataDto){
  
        let queryParams = '?';
        for(let key in search){
            queryParams += `${key}=${search[key]}&`;
        }
        console.log('search', search );
        console.log('queryParams', queryParams );

        const url = this.configService.get<string>('URL_VEHICLE_DATA');
        console.log('url', url);
        try{
            const { data }: AxiosResponse = await lastValueFrom(this.httpService.get(url));
            
            return data;
        }catch(e){
            throw new InternalServerErrorException('Impossible to get vehicle data, try again later.')
        }
    }
}
