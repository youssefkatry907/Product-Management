import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {

  @ApiProperty({
    example: true,
    description: 'Indicates if the request was successful',
  })
  success: boolean;

  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      id: '5d725a037b292f5f8ceff789',
      email: "example@gmail,com",
      role: "user",
      token: "token"
    },
    description: 'Response data'
  })
  data?: {
    id: ObjectId;
    email: string;
    role: string;
    token?: string;
  }
}
