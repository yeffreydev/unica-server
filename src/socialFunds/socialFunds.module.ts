import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { SocialFundsService } from './socialFunds.service';
import { SocialFundsController } from './socialFunds.controller';

@Module({
  controllers: [SocialFundsController],
  providers: [SocialFundsService],
  imports: [PrismaModule],
})
export class SocialFundsModule {}
