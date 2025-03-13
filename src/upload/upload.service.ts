import { Injectable } from '@nestjs/common';
import { BankIdentity, Stock } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async postPhoto(): Promise<{ bank: BankIdentity; mainStock: Stock }> {
    const bank = await this.prisma.bankIdentity.findFirst();
    const mainStock = await this.prisma.stock.findFirst();
    return {
      bank,
      mainStock,
    };
  }
  async saveLogo(file: File, folder: string): Promise<string> {
    //upload to aws s3
    return 'url';
  }
  async saveFiles(files: File[], folder: string): Promise<string[]> {
    const saveFiles = [];
    for (const file of files) {
      //upload to aws s3
    }
    return saveFiles;
  }
}
