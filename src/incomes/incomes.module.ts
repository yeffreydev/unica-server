import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports: [PrismaModule],
})
export class IncomesModule {}
