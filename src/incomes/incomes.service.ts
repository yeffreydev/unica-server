import { Injectable } from '@nestjs/common';
import { Incomes } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';
import { IncomeTypes } from 'src/constants';

@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOtherIncomes() {
    return this.prisma.incomes.findMany({
      where: {
        type: {
          name: IncomeTypes.OTHER,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createOtherIncome(data: Incomes) {
    const otherIncomeType = await this.prisma.incomesType.findFirst({
      where: {
        name: IncomeTypes.OTHER,
      },
    });

    if (!otherIncomeType) {
      throw new Error('Invalid income type');
    }
    return this.prisma.incomes.create({
      data: {
        userId: Number(data.userId || undefined),
        typeId: otherIncomeType.id,
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
