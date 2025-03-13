import { Injectable } from '@nestjs/common';
import { Stock, UserStock } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async getAllBuyStocks(): Promise<UserStock[]> {
    return this.prisma.userStock.findMany({
      include: {
        user: true,
      },
    });
  }

  async getStocksByUserId(id: number): Promise<UserStock[]> {
    return this.prisma.userStock.findMany({
      where: {
        userId: id,
      },
    });
  }
  async getStockById(id: number): Promise<UserStock> {
    return this.prisma.userStock.findUnique({
      where: {
        id,
      },
    });
  }

  async buyStock(data: UserStock): Promise<UserStock> {
    const stock = await this.prisma.stock.findFirst();
    if (!stock) {
      throw new Error('Stock not found');
    }

    const createdUserStock = await this.prisma.userStock.create({
      data: {
        userId: data.userId,
        stockId: stock.id,
        quantity: Number(data.quantity),
        price: stock.price,
      },
      include: {
        user: true,
      },
    });

    return createdUserStock;
  }
  async updateStock(id: number, data: Stock): Promise<Stock> {
    return this.prisma.stock.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteStock(id: number): Promise<Stock> {
    return await this.prisma.stock.delete({
      where: {
        id,
      },
    });
  }
}
