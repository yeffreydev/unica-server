import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { SocialFundsExpensesService } from './socialFunds.service';
import { SocialFundsExpensesController } from './socialFunds.controller';

@Module({
  controllers: [SocialFundsExpensesController],
  providers: [SocialFundsExpensesService],
  imports: [PrismaModule],
})
export class SocialFundsExpensesModule {}
