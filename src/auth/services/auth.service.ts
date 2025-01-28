import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('Users') private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async register(authRequest: AuthRequestDto): Promise<AuthResponseDto> {
        const isUserExist = await this.userModel.findOne({ email: authRequest.email });
        if (isUserExist) {
            throw new Error('User already exists');
        }
        const user = new this.userModel(authRequest);
        await user.save();
        return {
            id: user._id as ObjectId,
            email: user.email,
            role: user.role,
        };
    }

    async login(authRequest: AuthRequestDto): Promise<AuthResponseDto> {
        const user = await this.userModel.findOne({ email: authRequest.email });
        if (!user || !(await bcrypt.compare(authRequest.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return {
            id: user._id as ObjectId,
            email: user.email,
            role: user.role,
            token: await this.jwtService.signAsync({ id: user._id, email: user.email, role: user.role }),
        };
    }
}