import { Body, Controller, Get, Post } from '@nestjs/common';
import { SocialFundsTransactions } from '@prisma/client';
import { SocialFundsExpensesService } from './socialFunds.service';

@Controller('expenses/social-funds')
export class SocialFundsExpensesController {
  constructor(
    private readonly socialFundsService: SocialFundsExpensesService,
  ) {}

  @Post('create-transaction')
  async createTransaction(@Body() data: SocialFundsTransactions) {
    this.socialFundsService.createSocialFundsTransaction(data);
    return { message: 'Transaction created successfully' };
  }

  @Get('transactions')
  async getTransactions() {
    return this.socialFundsService.getSocialFundsTransactions();
  }
}
