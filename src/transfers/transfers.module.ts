import { Module } from '@nestjs/common';
import { TransferController } from './transfers.controller';
import { TransferService } from './transfers.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
  imports: [PrismaModule],
})
export class TransferModule {}
