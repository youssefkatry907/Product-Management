import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './helpers/auth.guard';
import { RbacGuard } from './rbac/rbac.guard';
import { DatabaseModule } from '../db.module';
import * as dotenv from 'dotenv';
dotenv.config();

// console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  providers: [AuthService, AuthGuard, RbacGuard],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}
