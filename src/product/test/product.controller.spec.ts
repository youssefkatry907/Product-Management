import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('ProductController', () => {
    let controller: ProductController;
  
    const mockProductService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [
          { provide: ProductService, useValue: mockProductService },
          { provide: JwtService, useValue: { sign: jest.fn() } },
          { provide: Reflector, useValue: new Reflector() },
        ],
      }).compile();
  
      controller = module.get<ProductController>(ProductController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });