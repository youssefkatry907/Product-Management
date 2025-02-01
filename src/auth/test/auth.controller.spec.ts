import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

const mockAuthService = {
  findOne: jest.fn(),
  create: jest.fn(),
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: Reflector, useValue: new Reflector() }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});