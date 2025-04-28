import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { FilesController } from './files.controller';
import { BankService } from 'src/bank/bank.service';

@Module({
  controllers: [FilesController],
  providers: [BankService],
  imports: [PrismaModule],
})
export class FilesModule {}
