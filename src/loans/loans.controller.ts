import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LoanTransactionService } from './loans.service';
import { Loan } from '@prisma/client';

@Controller('loans')
export class LoanTransactionController {
  constructor(private readonly TransactionService: LoanTransactionService) {}

  @Get()
  async getAllLoanTransactions() {
    return this.TransactionService.getAllLoanTransactions();
  }

  @Get('installments/:id')
  async getLoanInstallments(@Param('id') id: string) {
    return this.TransactionService.getLoanInstallments(id);
  }

  @Get('month/installments')
  async getCurrentMonthInstallments() {
    return this.TransactionService.getCurrentMontInstallments();
  }

  @Post()
  async createLoanTransaction(@Body() data: Loan) {
    return this.TransactionService.createLoanTransaction(data);
  }

  @Get('users')
  async getUsersWithLoans() {
    return this.TransactionService.getUsersWithLoans();
  }

  @Get('types')
  async getLoanTypes() {
    return this.TransactionService.getLoanTypes();
  }

  @Delete(':id')
  async deleteLoanTransaction(@Param('id') id: string) {
    return this.TransactionService.deleteLoanTransaction(id);
  }
}
