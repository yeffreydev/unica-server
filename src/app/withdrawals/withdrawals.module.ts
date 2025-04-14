import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';

@Module({
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService],
  imports: [PrismaModule],
})
export class WithdrawalsModule {}
