import { Injectable } from '@nestjs/common';
import { SocialFundsTransactions } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SocialFundsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSocialFunds() {
    return this.prisma.socialFunds.findMany({});
  }

  async createSocialFundsTransaction(data: SocialFundsTransactions) {
    return this.prisma.socialFundsTransactions.create({
      data: {
        socialFundsId: Number(data.socialFundsId),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }

  async getSocialFundsTransactions() {
    return this.prisma.socialFundsTransactions.findMany({
      include: {
        socialFunds: true,
      },
    });
  }
}
