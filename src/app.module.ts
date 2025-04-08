import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { StockModule } from './stocks/stocks.module';
import { TransactionModule } from './transactions/transactions.module';
import { LoanTransactionModule } from './loans/loans.module';
import { UploadModule } from './upload/upload.module';
import { SocialFundsModule } from './socialFunds/socialFunds.module';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BankModule,
    StockModule,
    TransactionModule,
    LoanTransactionModule,
    UploadModule, //para subir archivos
    SocialFundsModule,
    IncomesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
