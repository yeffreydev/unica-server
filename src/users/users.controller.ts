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

  /**
   * Endpoint to get all users.
   * @param req - The request object.
   * @returns List of all users.
   * @throws UnauthorizedException if the user is not authorized.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllUser(@Request() req) {
    return this.UserService.getAll();
  }

  /**
   * Endpoint for user login.
   * Uses LocalAuthGuard to validate user credentials.
   * @param req - The request object containing user credentials.
   * @param req.body.name - The name of the user.
   * @param req.body.lastname - The lastname of the user.
   * @param req.body.dni - The Nacional ID of the user.
   * @param req.body.password - The password of the user.
   * @param req.body.email? - optional email of the user.
   * @param req.body.phone? - optional phone number of the user.
   * @returns Access token and refresh token on successful login.
   * @throws UnauthorizedException if credentials are invalid.
   */
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  async createUser(@Body() data: User) {
    console.log(data);
    return this.UserService.createUser(data);
  }

  /**
   * Endpoint to get a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns User data if found.
   * @throws NotFoundException if the user does not exist.
   */

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const UserFound = await this.UserService.getUserById(Number(id));
    if (!UserFound) throw new NotFoundException('User does not exist');
    return UserFound;
  }

  /**
   * Endpoint to delete a user by ID.
   * @param id - The ID of the user to delete.
   * @returns Confirmation message on successful deletion.
   * @throws NotFoundException if the user does not exist.
   */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.UserService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }

  /**
   * Endpoint to update a user by ID.
   * @param id - The ID of the user to update.
   * @param data - The user data to update.
   * @returns Updated user data on successful update.
   * @throws NotFoundException if the user does not exist.
   * */
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
