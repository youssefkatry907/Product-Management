import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthGuard } from '../helpers/auth.guard';
import { RbacGuard } from '../rbac/rbac.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from '../rbac/permissions.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard, RbacGuard)
  @Permission('auth:register')
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(@Body() registerUserDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard, RbacGuard)
  @Permission('auth:login')
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Body() loginUserDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(loginUserDto);
  }
}