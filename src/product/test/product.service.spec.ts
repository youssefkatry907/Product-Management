import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { ProductRequestDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';


const mockProduct = {
  _id: '60d21b9667d0d8992e610c85',
  name: 'New Product',
  description: 'A sample product',
  price: 100,
  stock: 50,
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
};

const mockProductModel = {
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockResolvedValue(null),
  findById: jest.fn().mockResolvedValue(mockProduct),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockProduct),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockProduct),
  create: jest.fn().mockResolvedValue(mockProduct),
  save: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getModelToken('Products'), useValue: mockProductModel },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<Product>>(getModelToken('Products'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const productDto: ProductRequestDto = {
        name: 'New Product',
        description: 'New product description',
        price: 200,
        stock: 10,
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      jest.spyOn(model, 'create').mockResolvedValue(mockProduct as any);

      const result = await service.create(productDto);
      expect(result.success).toBeTruthy();
      expect(result.data?.name).toEqual(productDto.name);
    });

    it('should throw ConflictException if product already exists', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockProduct);

      const productDto: ProductRequestDto = {
        name: 'Existing Product',
        description: 'Already exists',
        price: 300,
        stock: 5,
      };

      await expect(service.create(productDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([mockProduct]),
      } as any);

      const result = await service.findAll(0, 10);
      expect(result.success).toBeTruthy();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toEqual(mockProduct.name);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await service.findOne('679bb8724f5eebcf5d6060ff');
      expect(result.success).toBeTruthy();
      expect(result.data?.name).toEqual(mockProduct.name);
    });

    it('should throw an error if product is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);
      await expect(service.findOne('invalid_id')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = { name: 'Updated Product' };

      const result = await service.update('679bb8724f5eebcf5d6060ff', updateDto);
      expect(result.success).toBeTruthy();
      expect(result.data?.name).toEqual(mockProduct.name);
    });

    it('should throw an error if product is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);
      await expect(service.update('invalid_id', {})).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const result = await service.delete('60d21b9667d0d8992e610c85');
      expect(result.success).toBeTruthy();
      expect(result.message).toEqual('Product deleted successfully');
    });

    it('should throw an error if product is not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);
      await expect(service.delete('invalid_id')).rejects.toThrowError();
    });
  });
});
