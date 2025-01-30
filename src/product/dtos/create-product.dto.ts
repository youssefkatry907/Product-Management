import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductRequestDto {
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name can not be empty' })
    name: string;

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description can not be empty' })
    description: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsNotEmpty({ message: 'Price can not be empty' })
    price: number;

    @IsNumber({}, { message: 'Stock must be a number' })
    @IsNotEmpty({ message: 'Stock can not be empty' })
    stock: number;
}