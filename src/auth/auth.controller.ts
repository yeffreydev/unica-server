import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.authService.register(userData);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
