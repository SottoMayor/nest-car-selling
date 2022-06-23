import { applyDecorators } from "@nestjs/common";
import { ApiHeader, ApiParam, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { UserNotFoundDto } from "../../dtos/UserNotFound.dto";
import { UserDto } from "../../dtos/User.dto";

export function FindUserByIdDocs() {
    return applyDecorators(
        //ApiHeaders([{}, ..., {}]),
        ApiHeader({
            name: 'Content-Type',
            description: 'Set the app content type',
            example: 'application/json'
        }),
        ApiParam({name: 'id', description: 'Search an user by the given id.', example: 1}),
        ApiOperation({ summary: 'Find an user by ID',description: 'Some description here!' }),
        ApiOkResponse({ type: UserDto, description: 'The user was successfully retrieved.'}),
        ApiNotFoundResponse({ description: 'The user could not be found.', type: UserNotFoundDto })
    )
}