import { ObjectId } from "mongoose";

export class ListAllProductsDto {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        id: ObjectId;
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }[];
} 