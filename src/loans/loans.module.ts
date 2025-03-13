import { Module } from '@nestjs/common';
import { LoanTransactionController } from './loans.controller';
import { LoanTransactionService } from './loans.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [LoanTransactionController],
  providers: [LoanTransactionService],
  imports: [PrismaModule],
})
export class LoanTransactionModule {}
