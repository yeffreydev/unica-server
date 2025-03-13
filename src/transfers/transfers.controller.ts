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
import { TransferService } from './transfers.service';
import { Transfer } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('Transfers')
export class TransferController {
  constructor(private readonly TransferService: TransferService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllTransfer() {
    return this.TransferService.getAll();
  }
  @Post()
  async createTransfer(@Body() data: Transfer) {
    return this.TransferService.createTransfer(data);
  }
  @Get(':id')
  async getTransferById(@Param('id') id: string) {
    const TransferFound = await this.TransferService.getTransferById(
      Number(id),
    );
    if (!TransferFound) throw new NotFoundException('Transfer does not exist');
    return TransferFound;
  }
  @Delete(':id')
  async deleteTransfer(@Param('id') id: string) {
    try {
      return await this.TransferService.deleteTransfer(Number(id));
    } catch (error) {
      throw new NotFoundException('Transfer does not exist');
    }
  }
  @Put(':id')
  async updateTransfer(@Param('id') id: string, @Body() data: Transfer) {
    try {
      return await this.TransferService.updateTransfer(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Transfer does not exist');
    }
  }
}
