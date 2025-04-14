import { Module } from '@nestjs/common';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [PrismaModule],
})
export class AccountModule {}
