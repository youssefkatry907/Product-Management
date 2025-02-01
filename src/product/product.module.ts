import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RbacGuard } from '../shared/guards/rbac.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  providers: [ProductService, AuthGuard, RbacGuard],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
