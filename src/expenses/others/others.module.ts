import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { OthersExpensesService } from './others.service';
import { OtherExpensesController } from './others.controller';

@Module({
  controllers: [OtherExpensesController],
  providers: [OthersExpensesService],
  imports: [PrismaModule],
})
export class OtherExpensesModule {}
