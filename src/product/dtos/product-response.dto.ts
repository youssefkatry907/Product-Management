import { ObjectId } from "mongoose";


export class ProductResponseDto {
    success: boolean;
    statusCode: number;
    message: string;
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