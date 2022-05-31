import { UseInterceptors, NestInterceptor, 
    ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { classToPlain } from "class-transformer";

export class SerealizeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // This code will run before the request is handled

        console.log('Hello......')

        return next.handle().pipe(
            map((data: any) => {
                // This code will be executed after the response is sent
                console.log('....... World!!!')
            })
        )
    }
}