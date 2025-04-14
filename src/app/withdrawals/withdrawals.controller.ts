import { Body, Controller, Get, Post } from '@nestjs/common';
import { Withdrawals } from '@prisma/client';
import { WithdrawalsService } from './withdrawals.service';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post()
  async createWithdrawal(@Body() data: Withdrawals) {
    this.withdrawalsService.createWithdrawal(data);
    return { message: 'withdrawal created successfully' };
  }

  @Get()
  async getAllWithdrawals() {
    return this.withdrawalsService.getWithdrawals();
  }
}
