import { Injectable } from '@nestjs/common';
import { AdministrativeExpenses } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdministrativeExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdministrativeExpenses() {
    return this.prisma.administrativeExpenses.findMany({
      include: {
        user: {
          select: {
            name: true,
            lastname: true,
          },
        },
      },
    });
  }

  async createAdministrativeExpense(data: AdministrativeExpenses) {
    return this.prisma.administrativeExpenses.create({
      data: {
        userId: Number(data.userId || undefined),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
