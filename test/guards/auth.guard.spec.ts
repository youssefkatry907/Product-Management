import { AuthGuard } from '../../src/shared/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    const mockJwtService = { verify: jest.fn(() => true) };
    const mockReflector = new Reflector();
    guard = new AuthGuard(mockJwtService as any, mockReflector);
  });

  it('should allow access if JWT is valid', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
      }),
    } as ExecutionContext;
    expect(guard.canActivate(mockContext)).toBe(true);
  });
});
