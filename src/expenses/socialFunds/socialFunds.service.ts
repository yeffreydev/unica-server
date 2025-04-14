import { Injectable } from '@nestjs/common';
import { SocialFundsExpenses } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SocialFundsExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async createSocialFundsTransaction(data: SocialFundsExpenses) {
    return this.prisma.socialFundsExpenses.create({
      data: {
        userId: Number(data.userId || undefined),
        socialFundsId: Number(data.socialFundsId),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }

  async getSocialFundsTransactions() {
    return this.prisma.socialFundsExpenses.findMany({
      include: {
        socialFunds: true,
      },
    });
  }
}
