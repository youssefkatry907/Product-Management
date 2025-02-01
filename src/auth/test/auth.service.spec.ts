import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');


const mockUser = {
  _id: 'mockUserId',
  email: "test@example.com",
  password: "Test1234",
}

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue(mockUser.email),
  create: jest.fn().mockResolvedValue(mockUser),
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mockJwtToken'),
};

describe('AuthService', () => {
  let authService: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('Users'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user and return success response', async () => {
      const authRequest: AuthRequestDto = { email: 'test@example.com', password: 'Test1234' };


      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      jest.spyOn(model, 'create').mockResolvedValue(mockUser as any);

      const result = await authService.register(authRequest);
      expect(result.success).toBeTruthy();
      expect(result.data?.email).toEqual(authRequest.email);
    });

    it('should throw ConflictException if user already exists', async () => {
      const authRequest: AuthRequestDto = { email: 'test@example.com', password: 'Test1234' };
      jest.spyOn(model, 'findOne').mockResolvedValue(mockUser.email);

      await expect(authService.register(authRequest)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return login response with JWT token', async () => {
      const authRequest: AuthRequestDto = { email: 'test@example.com', password: 'Test1234' };
      const mockUser = { _id: 'mockUserId', email: authRequest.email, password: await bcrypt.hash('Test1234', 10), role: 'user' };

      mockUserModel.findOne = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await authService.login(authRequest);
      expect(result.success).toBeTruthy();
    });

    it('should throw HttpException if credentials are incorrect', async () => {
      const authRequest: AuthRequestDto = { email: 'wrong@example.com', password: 'Wrong1234' };
      mockUserModel.findOne = jest.fn().mockResolvedValue(null);

      await expect(authService.login(authRequest)).rejects.toThrow(HttpException);
    });
  });
});
