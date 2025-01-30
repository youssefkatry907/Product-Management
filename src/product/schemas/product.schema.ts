import { Schema, Document } from 'mongoose';


export const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export interface Product extends Document {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}