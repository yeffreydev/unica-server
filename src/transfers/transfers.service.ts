import { Injectable } from '@nestjs/common';
import { Transfer } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class TransferService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Transfer[]> {
    return this.prisma.transfer.findMany();
  }
  async getTransferById(id: number): Promise<Transfer> {
    return this.prisma.transfer.findUnique({
      where: {
        id,
      },
    });
  }
  async createTransfer(data: Transfer): Promise<Transfer> {
    return this.prisma.transfer.create({
      data,
    });
  }
  async updateTransfer(id: number, data: Transfer): Promise<Transfer> {
    return this.prisma.transfer.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteTransfer(id: number): Promise<Transfer> {
    return await this.prisma.transfer.delete({
      where: {
        id,
      },
    });
  }
}
