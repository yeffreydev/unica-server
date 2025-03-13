import { Module } from '@nestjs/common';
import { TransactionController } from './deposits.controller';
import { DepositTransactionService } from './deposits.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [DepositTransactionService],
  imports: [PrismaModule],
})
export class DepositTransactionsModule {}
