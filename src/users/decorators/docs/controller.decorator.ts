import { applyDecorators } from "@nestjs/common";
import { ApiHeader, ApiParam, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiUnprocessableEntityResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { UserNotFoundDto } from "../../dtos/UserNotFound.dto";
import { UserDto } from "../../dtos/User.dto";
import { UserErrorDto } from "src/users/dtos/UserError.dto";

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

export function CreateUserDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Sign up users', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiCreatedResponse({ description: 'The user has been created', type: UserDto}),
        ApiBadRequestResponse({ description: 'This email is already in use!', type: UserErrorDto}),
    )
}

export function SigninDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Sign in users', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiCreatedResponse({ description: 'The user has been created.', type: UserDto}),
        ApiNotFoundResponse({ description: 'This email not exist.', type: UserNotFoundDto}),
        ApiUnprocessableEntityResponse({ description: 'This password is not correct.', type: UserErrorDto }),
    )
}

export function WhoIamDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Who is the user which was authenticated?', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' 
                + 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}),
        ApiOkResponse({ description: 'The authenticated user.', type: UserDto}),
        ApiNotFoundResponse({ description: 'This email not exist.', type: UserNotFoundDto}),
        ApiForbiddenResponse({ description: 'You need to be logged in to view this information.', type: UserErrorDto })
    )
}