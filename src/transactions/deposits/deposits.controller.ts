import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepositTransactionService } from './deposits.service';
import { Transaction } from '@prisma/client';

@Controller('transactions/deposits')
export class TransactionController {
  constructor(
    private readonly DepositTransactionService: DepositTransactionService,
  ) {}

  @Get()
  async getAllTransaction() {
    return this.DepositTransactionService.getAll();
  }
  @Post()
  async createTransaction(@Body() data: Transaction) {
    return this.DepositTransactionService.createDepositTransaction(data);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      return await this.DepositTransactionService.deleteDepositTransaction(
        Number(id),
      );
    } catch (error) {
      throw new NotFoundException('Transaction does not exist');
    }
  }
  @Put(':id')
  async updateTransaction(@Param('id') id: string, @Body() data: Transaction) {
    try {
      return await this.DepositTransactionService.updateDepositTransaction(
        Number(id),
        data,
      );
    } catch (error) {
      throw new NotFoundException('Transaction does not exist');
    }
  }
}
