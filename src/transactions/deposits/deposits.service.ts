import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionTypes } from 'src/constants';
@Injectable()
export class DepositTransactionService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: {
        type: {
          name: TransactionTypes.DEPOSIT,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createDepositTransaction(data: Transaction): Promise<Transaction> {
    const type = await this.prisma.transactionType.findFirst({
      where: {
        name: TransactionTypes.DEPOSIT,
      },
    });
    return this.prisma.transaction.create({
      data: {
        amount: Number(data.amount),
        userId: data.userId,
        typeId: type.id,
        description: 'Deposit',
      },
      include: {
        user: true,
      },
    });
  }

  async updateDepositTransaction(
    id: number,
    data: Transaction,
  ): Promise<Transaction> {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteDepositTransaction(id: number): Promise<Transaction> {
    return await this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
