import { Body, Controller, Get, Post } from '@nestjs/common';
import { SocialFundsTransactions } from '@prisma/client';
import { SocialFundsService } from './socialFunds.service';

@Controller('social-funds')
export class SocialFundsController {
  constructor(private readonly socialFundsService: SocialFundsService) {}

  @Post('create-transaction')
  async createTransaction(@Body() data: SocialFundsTransactions) {
    this.socialFundsService.createSocialFundsTransaction(data);
    return { message: 'Transaction created successfully' };
  }

  @Get('transactions')
  async getTransactions() {
    return this.socialFundsService.getSocialFundsTransactions();
  }

  @Get()
  async getAllSocialFunds() {
    return this.socialFundsService.getAllSocialFunds();
  }
}
