import { UseInterceptors, NestInterceptor, 
    ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerealizeInterceptor implements NestInterceptor {

    constructor(private targetDto: any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // This code will run before the request is handled

        return next.handle().pipe(
            map((data: any) => {
                // This code will be executed after the response is sent
                return plainToClass(this.targetDto, data, { excludeExtraneousValues: true })
            })
        )
    }
}