import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

export function IsAuth() {
    return UseGuards(AuthGuard);
}