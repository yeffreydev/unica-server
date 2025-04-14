import { Body, Controller, Get, Post } from '@nestjs/common';
import { Dividends } from '@prisma/client';
import { DividendsService } from './dividends.service';

@Controller('expenses/dividends')
export class DividendsController {
  constructor(private readonly divividendsService: DividendsService) {}

  @Post()
  async createDividends(@Body() data: Dividends) {
    this.divividendsService.createDividend(data);
    return { message: 'dividend created successfully' };
  }

  @Get()
  async getAllDividendss() {
    return this.divividendsService.getDividends();
  }
}
