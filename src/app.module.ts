import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { StockModule } from './stocks/stocks.module';
import { TransactionModule } from './transactions/transactions.module';
import { LoanTransactionModule } from './loans/loans.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BankModule,
    StockModule,
    TransactionModule,
    LoanTransactionModule,
    UploadModule, //para subir archivos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
