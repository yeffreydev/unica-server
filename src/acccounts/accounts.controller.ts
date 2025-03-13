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
import { AccountService } from './accounts.service';
import { Account } from '@prisma/client';

@Controller('Accounts')
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @Get()
  async getAllAccount() {
    return this.AccountService.getAll();
  }
  @Post()
  async createAccount(@Body() data: Account) {
    return this.AccountService.createAccount(data);
  }
  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    const AccountFound = await this.AccountService.getAccountById(Number(id));
    if (!AccountFound) throw new NotFoundException('Account does not exist');
    return AccountFound;
  }
  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    try {
      return await this.AccountService.deleteAccount(Number(id));
    } catch (error) {
      throw new NotFoundException('Account does not exist');
    }
  }
  @Put(':id')
  async updateAccount(@Param('id') id: string, @Body() data: Account) {
    try {
      return await this.AccountService.updateAccount(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Account does not exist');
    }
  }
}
