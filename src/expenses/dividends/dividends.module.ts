import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { DividendsService } from './dividends.service';
import { DividendsController } from './dividends.controller';

@Module({
  controllers: [DividendsController],
  providers: [DividendsService],
  imports: [PrismaModule],
})
export class DividendsModule {}
