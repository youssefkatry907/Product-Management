import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
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
      name: 'Product name',
      description: 'Product description',
      price: 100,
      stock: 100,
      createdAt: '2021-09-06T13:28:06.419Z',
      updatedAt: '2021-09-06T13:28:06.419Z',
    },
    description: 'Response data',
  })
  data?: {
    id: string | ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
