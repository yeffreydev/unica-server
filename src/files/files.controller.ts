// file.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { BankService } from 'src/bank/bank.service';

@Controller('files')
export class FilesController {
  constructor(private readonly bankService: BankService) {}
  @Get('logo')
  async getLogo(@Res() res: Response) {
    const bank = await this.bankService.getBank();
    if (!bank) {
      return res.status(404).send('Bank not found');
    }
    const filename = bank.bank.avatar;
    const filePath = join(__dirname, '../../../uploads', filename);
    return res.sendFile(filePath);
  }
  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.sendFile(filePath);
  }
}
