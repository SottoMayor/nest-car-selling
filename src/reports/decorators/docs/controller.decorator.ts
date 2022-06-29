import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse, ApiQuery } from "@nestjs/swagger";
import { InternalServerErrorDto } from "../../../reports/dtos/ReportsError.dto";

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