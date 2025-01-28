import { ObjectId } from "mongoose";
export class AuthResponseDto {
    id: ObjectId;
    email: string;
    role: string;
    token?: string;
}