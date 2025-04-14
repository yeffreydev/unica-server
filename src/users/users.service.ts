import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from 'src/app/auth/role.enum';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(data: User): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        dni: data.dni,
      },
    });

    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(
      data.dni,
      Number(process.env.SALT_ROUNDS),
    );

    data.password = hashedPassword;
    data.roleId = 2; //user

    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const userRole = await this.prisma.role.findUnique({
      where: {
        id: user.roleId,
      },
    });

    if (userRole.name === Role.Admin) {
      throw new Error('You cannot delete an admin');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
