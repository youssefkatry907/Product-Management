import { ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const GlobalValidationProvider = {
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const firstError = errors[0]; // Get first validation error
      const message = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Validation error';
      return new BadRequestException({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      });
    },
  }),
};