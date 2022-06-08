import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";

export function IsAuth() {
    return UseGuards(AuthGuard);
}