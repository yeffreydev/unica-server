import { Injectable } from '@nestjs/common';
import { Withdrawals } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class WithdrawalsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWithdrawals() {
    return this.prisma.withdrawals.findMany({
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

  async createWithdrawal(data: Withdrawals) {
    return this.prisma.withdrawals.create({
      data: {
        userId: Number(data.userId || undefined),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
