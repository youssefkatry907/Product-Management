import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import rbac from '../rbac/rbac.definition';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<string>('permission', context.getHandler());
    if (!permission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAllowed = await rbac.can(user.role, permission);
    if (!isAllowed) {
      throw new ForbiddenException({
        success: false,
        statusCode: 403,
        message: 'Not allowed to perform this action',
      });
    }
    return isAllowed;
  }
}