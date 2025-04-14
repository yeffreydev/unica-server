import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { BankModule } from './bank/bank.module';
import { StockModule } from './stocks/stocks.module';
import { TransactionModule } from './transactions/transactions.module';
import { LoanTransactionModule } from './loans/loans.module';
import { UploadModule } from './upload/upload.module';
import { SocialFundsModule } from './socialFunds/socialFunds.module';
import { IncomesModule } from './incomes/incomes.module';
import { WithdrawalsModule } from './app/withdrawals/withdrawals.module';
import { PayoutsModule } from './expenses/payouts/interestPayments.module';
import { AdministrativeExpensesModule } from './expenses/administrative/administrative.module';
import { DividendsModule } from './expenses/dividends/dividends.module';
import { SocialFundsExpensesModule } from './expenses/socialFunds/socialFunds.module';
import { OtherExpensesModule } from './expenses/others/others.module';
import { FormsModule } from './app/forms/forms.module';

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
    WithdrawalsModule,
    PayoutsModule,
    AdministrativeExpensesModule,
    DividendsModule,
    SocialFundsExpensesModule,
    OtherExpensesModule,
    FormsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
