import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AdministrativeExpensesService } from './administrative.service';
import { AdministrativeExpensesController } from './administrative.controller';

@Module({
  controllers: [AdministrativeExpensesController],
  providers: [AdministrativeExpensesService],
  imports: [PrismaModule],
})
export class AdministrativeExpensesModule {}
