import { Injectable } from '@nestjs/common';
import { Expenses } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';
import { ExpensesTypes } from 'src/constants';

@Injectable()
export class OthersExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOtherExpenses() {
    return this.prisma.expenses.findMany({
      where: {
        type: {
          name: ExpensesTypes.OTHER,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createOtherExpense(data: Expenses) {
    const otherExpenseType = await this.prisma.expensesType.findFirst({
      where: {
        name: ExpensesTypes.OTHER,
      },
    });

    if (!otherExpenseType) {
      throw new Error('Invalid expense type');
    }
    return this.prisma.expenses.create({
      data: {
        userId: Number(data.userId || undefined),
        typeId: otherExpenseType.id,
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
