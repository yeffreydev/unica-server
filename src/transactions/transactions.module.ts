import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { PrismaModule } from 'prisma/prisma.module';
import { DepositTransactionsModule } from './deposits/deposits.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, DepositTransactionsModule],
})
export class TransactionModule {}
