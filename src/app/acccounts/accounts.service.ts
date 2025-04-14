import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Account[]> {
    return this.prisma.account.findMany();
  }
  async getAccountById(id: number): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }
  async createAccount(data: Account): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }
  async updateAccount(id: number, data: Account): Promise<Account> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteAccount(id: number): Promise<Account> {
    return await this.prisma.account.delete({
      where: {
        id,
      },
    });
  }
}
