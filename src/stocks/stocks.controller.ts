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
import { StockService } from './stocks.service';
import { Stock, UserStock } from '@prisma/client';
import { JwtAuthGuard } from 'src/app/auth/jwt-auth.guard';
import { RolesGuard } from 'src/app/auth/roles.guard';
import { Role } from 'src/app/auth/role.enum';
import { Roles } from 'src/app/auth/roles.decorator';

@Controller('stocks')
export class StockController {
  constructor(private readonly StockService: StockService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getAllBuyStocks() {
    return this.StockService.getAllBuyStocks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('buy')
  async buyStock(@Body() data: UserStock) {
    return this.StockService.buyStock(data);
  }

  ///get user stocks
  @Get('user/:id')
  async getAllStock(@Param('id') id: string) {
    return this.StockService.getStocksByUserId(Number(id));
  }

  // @Get(':id')
  // async getStockById(@Param('id') id: string) {
  //   const StockFound = await this.StockService.getStockById(Number(id));
  //   if (!StockFound) throw new NotFoundException('Stock does not exist');
  //   return StockFound;
  // }
  // @Delete(':id')
  // async deleteStock(@Param('id') id: string) {
  //   try {
  //     return await this.StockService.deleteStock(Number(id));
  //   } catch (error) {
  //     throw new NotFoundException('Stock does not exist');
  //   }
  // // }
  // @Put(':id')
  // async updateStock(@Param('id') id: string, @Body() data: Stock) {
  //   try {
  //     return await this.StockService.updateStock(Number(id), data);
  //   } catch (error) {
  //     throw new NotFoundException('Stock does not exist');
  // }
  // }
}
