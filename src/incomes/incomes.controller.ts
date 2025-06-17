import { Body, Controller, Get, Post } from '@nestjs/common';
import { Incomes } from '@prisma/client';
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly socialFundsService: IncomesService) {}

  @Post('create-other-income')
  async createOtherIncome(@Body() data: Incomes) {
    return this.socialFundsService.createOtherIncome(data);
  }

  @Get('others')
  async getAllOtherIncomes() {
    return this.socialFundsService.getOtherIncomes();
  }
}
