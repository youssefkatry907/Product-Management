import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductRequestDto } from '../dtos/create-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ListAllProductsDto } from '../dtos/list-all-products.dto';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from '../../shared/rbac/permissions.decorator';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { RbacGuard } from '../../shared/guards/rbac.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('product')
@ApiBearerAuth('JWT-auth')
@Controller('api/v1/product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post('createProduct')
  @UseGuards(AuthGuard, RbacGuard)
  @Permission('product:create')
  @ApiBody({ type: ProductRequestDto, description: 'Product creation' })
  @ApiResponse({ type: ProductResponseDto })
  async createProduct(
    @Body() createProductDto: ProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto);
  }

  @Get('listAllProducts')
  @Permission('product:get')
  @ApiResponse({ type: ListAllProductsDto })
  async listAllProducts(
    @Query('page') page = 0,
    @Query('limit') limit = 10,
  ): Promise<ListAllProductsDto> {
    return this.productService.findAll(page, limit);
  }

  @Get('getProduct/:id')
  @Permission('product:get')
  @ApiResponse({ type: ProductResponseDto })
  async getProduct(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  @Patch('updateProduct/:id')
  @UseGuards(AuthGuard, RbacGuard)
  @Permission('product:update')
  @ApiBody({ type: UpdateProductDto, description: 'Product update' })
  @ApiResponse({ type: ProductResponseDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductBody: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.update(id, updateProductBody);
  }

  @Delete('deleteProduct/:id')
  @UseGuards(AuthGuard, RbacGuard)
  @Permission('product:delete')
  async deleteProduct(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.delete(id);
  }
}
