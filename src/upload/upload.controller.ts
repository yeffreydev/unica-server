import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 20 * 1024 * 1024 }, // Máximo 20MB
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new Error('Solo se permiten imágenes (JPG, JPEG, PNG)'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  ) // 'file' debe coincidir con el nombre del campo en la petición
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Archivo subido exitosamente',
      filename: file.filename,
      path: file.path,
    };
  }

  @Get('logo')
  getLogo(@Res() res: Response) {
    const logoPath = join(__dirname, '..', '..', 'uploads', 'logo.png');
    const defaultLogoPath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'defaultlogo.png',
    );

    const finalPath = existsSync(logoPath) ? logoPath : defaultLogoPath;

    return res.sendFile(finalPath);
  }
}
