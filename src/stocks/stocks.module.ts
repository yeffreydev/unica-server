import { Module } from '@nestjs/common';
import { StockController } from './stocks.controller';
import { StockService } from './stocks.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [PrismaModule],
})
export class StockModule {}
