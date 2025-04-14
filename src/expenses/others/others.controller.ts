import { Body, Controller, Get, Post } from '@nestjs/common';
import { Expenses } from '@prisma/client';
import { OthersExpensesService } from './others.service';

@Controller('expenses/others')
export class OtherExpensesController {
  constructor(private readonly otherExpensesService: OthersExpensesService) {}

  @Post()
  async createOtherExpense(@Body() data: Expenses) {
    this.otherExpensesService.createOtherExpense(data);
    return { message: 'Transaction created successfully' };
  }

  @Get()
  async getAllOtherExpenses() {
    return this.otherExpensesService.getOtherExpenses();
  }
}
