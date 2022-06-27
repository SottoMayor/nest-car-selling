import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiCreatedResponse ,ApiInternalServerErrorResponse, ApiQuery, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { ReportsDto } from "../../../reports/dtos/Reports.dto";
import { BadRequestDto, ForbiddenDto, InternalServerErrorDto, NotFoundDto } from "../../../reports/dtos/ReportsError.dto";

export function GetVehicleDataDocs() {
    return applyDecorators(
        ApiQuery({name: 'make', allowEmptyValue: true,required: false,example: 'honda',description: 'The manufacturer of the vehicle' }),
        ApiQuery({name: 'fromDate', allowEmptyValue: true,required: false,example: '01/09/2005',description: 'Inferior interval of date of vehicle manufacture' }),
        ApiQuery({name: 'toDate', allowEmptyValue: true,required: false,example: '10/10/2020',description: 'Superior interval of date of vehicle manufacture' }),
        ApiOperation({ summary: 'Getting vehicles information, with query params', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiOkResponse({ description: 'The list of reports was been found'}),
        ApiInternalServerErrorResponse({ description: 'This email is already in use!', type: InternalServerErrorDto})
    )
}

export function GetEstimateDocs() {
    return applyDecorators(
        ApiQuery({name: 'make', allowEmptyValue: false,required: true,example: 'honda',description: 'The manufacturer of the vehicle' }),
        ApiQuery({name: 'model', allowEmptyValue: false,required: true,example: 'city',description: 'The model of the vehicle' }),
        ApiQuery({name: 'lgn', allowEmptyValue: false,required: true,example: '100',description: 'The longitute that vehicle is located' }),
        ApiQuery({name: 'lat', allowEmptyValue: false,required: true,example: '10',description: 'The latitude that vehicle is located' }),
        ApiQuery({name: 'year', allowEmptyValue: false,required: true,example: '2020',description: 'The year that the vehicle was made' }),
        ApiQuery({name: 'mileage', allowEmptyValue: false,required: true,example: '150000',description: 'The total amount of miles that the vehicle toured' }),
        ApiOperation({ summary: 'Estimate a vehicle price, based on the average of 3 last vehicles found.', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiOkResponse({ description: 'The average of price for the given vehicle' }),
        ApiInternalServerErrorResponse({ description: 'Something went wrong, try again', type: InternalServerErrorDto})
    )
}

export function CreateReportDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new report!!', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiCreatedResponse({ description: 'The report was created successfully.', type: ReportsDto }),
        ApiForbiddenResponse({ description: 'You are not authorized.', type: ForbiddenDto  }),
        ApiInternalServerErrorResponse({ description: 'Something went wrong, try again', type: InternalServerErrorDto})
    )
}

export function ValidateReportDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Verify if a report is valid', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiOkResponse({ description: 'The report is valid.', type: ReportsDto }),
        ApiBadRequestResponse({ description: 'Call this endpoint just if you wanna approve a report', type: BadRequestDto }),
        ApiForbiddenResponse({ description: 'You are not authorized.', type: ForbiddenDto  }),
        ApiNotFoundResponse({ description: 'This report does not exist.', type: NotFoundDto }),
        ApiInternalServerErrorResponse({ description: 'Something went wrong, try again', type: InternalServerErrorDto})
    )
}