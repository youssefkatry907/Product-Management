import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
  ArgumentMetadata,
} from '@nestjs/common';

describe('GlobalValidationProvider', () => {
  let validationPipe: ValidationPipe;

  beforeEach(() => {
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const message = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : 'Validation error';
        return new BadRequestException({
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message,
        });
      },
    });
  });

  it('should throw BadRequestException for invalid input', async () => {
    const mockMetadata: ArgumentMetadata = {
      type: 'body',
      metatype: class {
        name: string;
      },
      data: '',
    };

    await expect(validationPipe.transform({}, mockMetadata)).rejects.toThrow(
      BadRequestException,
    );

    try {
      await validationPipe.transform({}, mockMetadata);
    } catch (error) {
      expect(error.response).toEqual({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: expect.any(String),
      });
    }
  });

  it('should pass valid input without throwing an error', async () => {
    const mockMetadata: ArgumentMetadata = {
      type: 'body',
      metatype: class {
        name: string;
      },
      data: '',
    };

    const validInput = { name: 'Valid Name' };
    await expect(
      validationPipe.transform(validInput, mockMetadata),
    ).resolves.toEqual(validInput);
  });

  it('should remove non-whitelisted properties', async () => {
    class TestDto {
      name: string;
    }

    const mockMetadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: '',
    };
    const input = { name: 'Valid Name', extraField: 'Should be removed' };

    const result = await validationPipe.transform(input, mockMetadata);
    expect(result).toEqual({ name: 'Valid Name' });
    expect(result).not.toHaveProperty('extraField');
  });
});
