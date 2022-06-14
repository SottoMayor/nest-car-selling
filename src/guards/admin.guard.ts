import { CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";
import { User } from "src/users/users.entity";

export function IsAdmin () {
    return UseGuards(AdminGuard);
}

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const user: User = request.currentUser;

        if(!user || !user.admin){
            return false;
        }

        return true;
    }
}