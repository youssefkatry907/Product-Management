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
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzI1YTAzN2IyOTJmNWY4Y2VmZjc4OSIsImlhdCI6MTU2NjIwMjM1OSwiZXhwIjoxNTY2Mjg4NzU5fQ.1e3Gj5e6vzQz7rL0QD5vFjw6Y6J7vX8uQ6L8ZP7GJ7g"
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
