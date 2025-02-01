import { ObjectId } from 'mongoose';

export class AuthResponseDto {
  success: boolean;
  statusCode: number;
  message: string;

  data?: {
    id: ObjectId;
    email: string;
    role: string;
    token?: string;
  };
}
