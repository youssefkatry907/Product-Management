import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name can not be empty' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description can not be empty' })
  description?: string;

  @IsOptional()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price can not be empty' })
  price?: number;

  @IsOptional()
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsNotEmpty({ message: 'Stock can not be empty' })
  stock?: number;
}
