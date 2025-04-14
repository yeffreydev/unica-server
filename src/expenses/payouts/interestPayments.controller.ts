import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepositorPayouts } from '@prisma/client';
import { InterestPaymentsService } from './interestPayments.service';

@Controller('payouts')
export class InterestPaymentController {
  constructor(private readonly interestPayments: InterestPaymentsService) {}

  @Post()
  async createInterestPayment(@Body() data: DepositorPayouts) {
    this.interestPayments.createInterestPayment(data);
    return { message: 'InterestPayment created successfully' };
  }

  @Get()
  async getAllInterestPayments() {
    return this.interestPayments.getInterestPayments();
  }
}
