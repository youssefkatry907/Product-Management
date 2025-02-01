import { RbacGuard } from '../../src/shared/guards/rbac.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RbacGuard', () => {
  let guard: RbacGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
      getAll: jest.fn(),
      getAllAndMerge: jest.fn(),
      getAllAndOverride: jest.fn(),
    } as jest.Mocked<Reflector>;
    guard = new RbacGuard(reflector);
  });

  it('should allow access if user has required role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ['admin'] } }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access if user does not have required role', () => {
    (reflector.get as jest.Mock).mockReturnValue(['admin']);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ['user'] } }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(false);
  });
});
