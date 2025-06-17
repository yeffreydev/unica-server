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

  /**
   * Endpoint for user login.
   * Uses LocalAuthGuard to validate user credentials.
   * @param req - The request object containing user credentials.
   * @param req.body.username - The username of the user.
   * @param req.body.password - The password of the user.
   * @returns Access token and refresh token on successful login.
   * @throws UnauthorizedException if credentials are invalid.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      return this.authService.refreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
