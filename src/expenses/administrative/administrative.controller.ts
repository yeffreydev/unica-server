import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdministrativeExpenses } from '@prisma/client';
import { AdministrativeExpensesService } from './administrative.service';

@Controller('expenses/administrative')
export class AdministrativeExpensesController {
  constructor(
    private readonly administrativeExpenses: AdministrativeExpensesService,
  ) {}

  @Post()
  async createAdministrativeExpenses(@Body() data: AdministrativeExpenses) {
    this.administrativeExpenses.createAdministrativeExpense(data);
    return { message: 'AdministrativeExpenses created successfully' };
  }

  @Get()
  async getAllAdministrativeExpensess() {
    return this.administrativeExpenses.getAdministrativeExpenses();
  }
}
