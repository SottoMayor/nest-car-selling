import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from '../users.entity';

// Adding an additional property to an interface already declared
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private usersService: UsersService){}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if(userId) {
            const user = await this.usersService.findById(userId);
            req.user = user;
        }

        next();
    }
}