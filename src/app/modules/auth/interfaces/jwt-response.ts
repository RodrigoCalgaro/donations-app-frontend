import { User } from "./user";

export interface JwtResponse {
    message: string;
    token: string;
    user: User;
}
