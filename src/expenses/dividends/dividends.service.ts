import { Injectable } from '@nestjs/common';
import { Dividends } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DividendsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDividends() {
    return this.prisma.dividends.findMany({
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

  async createDividend(data: Dividends) {
    return this.prisma.dividends.create({
      data: {
        userId: Number(data.userId || undefined),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
