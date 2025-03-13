import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionTypes } from 'src/constants';
@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async getUsersWithLoansInfo() {
    const transactionTypes = await this.prisma.transactionType.findMany({
      where: {
        name: {
          in: [TransactionTypes.LOAN, TransactionTypes.REPAYMENT],
        },
      },
    });
    const usersWithTransactions = await this.prisma.user.findMany({
      include: {
        transactions: {
          where: {
            typeId: {
              in: transactionTypes.map((type) => type.id),
            },
          },
        },
      },
    });
    const usersWithTotals = usersWithTransactions.map((user) => {
      const totalPrestamo = user.transactions
        .filter(
          (tx) =>
            tx.typeId ===
            transactionTypes.find((type) => type.name === TransactionTypes.LOAN)
              .id,
        )
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalPago = user.transactions
        .filter(
          (tx) =>
            tx.typeId ===
            transactionTypes.find(
              (type) => type.name === TransactionTypes.REPAYMENT,
            ).id,
        )
        .reduce((sum, tx) => sum + tx.amount, 0);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        totalPrestamo,
        totalPago,
      };
    });
    return usersWithTotals;
  }
  async createTransaction(data: Transaction): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }
  async updateTransaction(id: number, data: Transaction): Promise<Transaction> {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteTransaction(id: number): Promise<Transaction> {
    return await this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
