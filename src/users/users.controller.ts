import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/app/auth/jwt-auth.guard';
import { Roles } from 'src/app/auth/roles.decorator';
import { Role } from 'src/app/auth/role.enum';
import { RolesGuard } from 'src/app/auth/roles.guard';

@Controller('Users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllUser(@Request() req) {
    return this.UserService.getAll();
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Post()
  async createUser(@Body() data: User) {
    console.log(data);
    return this.UserService.createUser(data);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const UserFound = await this.UserService.getUserById(Number(id));
    if (!UserFound) throw new NotFoundException('User does not exist');
    return UserFound;
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.UserService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    try {
      return await this.UserService.updateUser(Number(id), data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
