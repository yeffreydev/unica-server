import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    try {
      return this.TransactionService.deleteLoanTransaction(id);
    } catch (error) {
      console.error('Error deleting loan transaction:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }

  //update
  @Put(':id')
  async updateLoanTransaction(@Param('id') id: string, @Body() data: Loan) {
    try {
      return this.TransactionService.updateLoanTransaction(id, data);
    } catch (error) {
      console.error('Error updating loan transaction:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }

  //get all installments

  @Get('by-user/:id')
  async getLoansByUser(@Param('id') id: string) {
    try {
      return this.TransactionService.getLoansWithNextInstallmentByUserId(id);
    } catch (error) {
      console.error('Error fetching loans by user:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }

  @Post('pay-loan/:loanId')
  async payLoan(
    @Param('loanId') loanId: string,
    @Body() data: { paymentAmount: number; interestAmount: number },
  ) {
    try {
      return this.TransactionService.payLoan(loanId, {
        paymentAmount: data.paymentAmount,
        date: new Date(),
        interestAmount: data.interestAmount,
      });
    } catch (error) {
      console.error('Error paying loan:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }

  @Get('paid-installments')
  async getPaidInstallments() {
    try {
      return this.TransactionService.getPaidInstallments();
    } catch (error) {
      console.error('Error fetching paid installments:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }
}
