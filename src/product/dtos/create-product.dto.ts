import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductRequestDto {
  @ApiProperty({
    example: 'Product name',
    description: 'Product name',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description can not be empty' })
  description: string;

  @ApiProperty({
    example: 100,
    description: 'Product price',
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price can not be empty' })
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Product stock',
  })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsNotEmpty({ message: 'Stock can not be empty' })
  stock: number;
}
