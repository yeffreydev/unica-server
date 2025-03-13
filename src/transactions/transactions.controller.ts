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
import { TransactionService } from './transactions.service';
import { Transaction } from '@prisma/client';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @Get()
  async getAllTransaction() {
    return this.TransactionService.getAll();
  }
  @Post()
  async createTransaction(@Body() data: Transaction) {
    return this.TransactionService.createTransaction(data);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      return await this.TransactionService.deleteTransaction(Number(id));
    } catch (error) {
      throw new NotFoundException('Transaction does not exist');
    }
  }
  @Put(':id')
  async updateTransaction(@Param('id') id: string, @Body() data: Transaction) {
    try {
      return await this.TransactionService.updateTransaction(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Transaction does not exist');
    }
  }
}
