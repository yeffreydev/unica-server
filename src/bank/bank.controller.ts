import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { BankIdentity } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('banks')
export class BankController {
  constructor(private readonly BankService: BankService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getBank() {
    const BankFound = await this.BankService.getBank();
    if (!BankFound) throw new NotFoundException('Bank does not exist');
    return BankFound;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteBank(@Param('id') id: string) {
    try {
      return await this.BankService.deleteBank(Number(id));
    } catch (error) {
      throw new NotFoundException('Bank does not exist');
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put()
  async updateBank(@Body() data: BankIdentity) {
    try {
      return await this.BankService.updateBank(data);
    } catch (error) {
      throw new NotFoundException('Bank does not exist');
    }
  }
}
