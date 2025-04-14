import { Injectable } from '@nestjs/common';
import { DepositorPayouts } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InterestPaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getInterestPayments() {
    return this.prisma.depositorPayouts.findMany({
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

  async createInterestPayment(data: DepositorPayouts) {
    return this.prisma.depositorPayouts.create({
      data: {
        userId: Number(data.userId || undefined),
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
      },
    });
  }
}
