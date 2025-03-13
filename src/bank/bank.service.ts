import { Injectable } from '@nestjs/common';
import { BankIdentity, Stock } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) {}

  async getBank(): Promise<{ bank: BankIdentity; mainStock: Stock }> {
    const bank = await this.prisma.bankIdentity.findFirst();
    const mainStock = await this.prisma.stock.findFirst();
    return {
      bank,
      mainStock,
    };
  }
  async createBank(data: BankIdentity): Promise<BankIdentity> {
    return this.prisma.bankIdentity.create({
      data,
    });
  }
  async updateBank(data: BankIdentity): Promise<BankIdentity> {
    const bank = await this.prisma.bankIdentity.findFirst();

    bank.name = data.name;
    bank.avatar = data.avatar;

    return this.prisma.bankIdentity.update({
      where: {
        id: bank.id,
      },
      data: bank,
    });
  }
  async deleteBank(id: number): Promise<BankIdentity> {
    return await this.prisma.bankIdentity.delete({
      where: {
        id,
      },
    });
  }
}
