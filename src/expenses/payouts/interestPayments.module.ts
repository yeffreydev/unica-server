import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { InterestPaymentsService } from './interestPayments.service';
import { InterestPaymentController } from './interestPayments.controller';

@Module({
  controllers: [InterestPaymentController],
  providers: [InterestPaymentsService],
  imports: [PrismaModule],
})
export class PayoutsModule {}
