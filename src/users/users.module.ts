import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
