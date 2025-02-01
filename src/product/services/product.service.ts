import {
  Injectable,
  ConflictException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { ObjectId } from 'mongoose';
import { ProductRequestDto } from '../dtos/create-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ListAllProductsDto } from '../dtos/list-all-products.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Products') private productModel: Model<Product>) {}

  async create(productRequest: ProductRequestDto): Promise<ProductResponseDto> {
    const isProductExist = await this.productModel.findOne({
      name: productRequest.name,
    });
    if (isProductExist) {
      console.log('Product already exists');
      throw new ConflictException({
        success: false,
        statusCode: 409,
        message: 'Product already exists',
      });
    }
    const newProduct = await this.productModel.create(productRequest);
    return {
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: {
        id: newProduct._id as ObjectId,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        createdAt: newProduct.createdAt,
        updatedAt: newProduct.updatedAt,
      },
    };
  }

  async findAll(
    page: number = 0,
    limit: number = 10,
  ): Promise<ListAllProductsDto> {
    const products = await this.productModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .lean();
    if (!products.length) {
      throw new HttpException(
        {
          success: false,
          statusCode: 404,
          message: 'No products found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Products found',
      data: products.map((product) => ({
        id: product._id as ObjectId,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    };
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException(
        {
          success: false,
          statusCode: 404,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Product found',
      data: {
        id: product._id as ObjectId,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  }

  async update(
    id: string,
    productRequest: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    console.log(productRequest);
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      productRequest,
      { new: true },
    );
    if (!updatedProduct) {
      throw new HttpException(
        {
          success: false,
          statusCode: 404,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Product updated successfully',
      data: {
        id: updatedProduct._id as ObjectId,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        createdAt: updatedProduct.createdAt,
        updatedAt: updatedProduct.updatedAt,
      },
    };
  }

  async delete(id: string): Promise<ProductResponseDto> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new HttpException(
        {
          success: false,
          statusCode: 404,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Product deleted successfully',
    };
  }
}
