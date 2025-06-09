import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { BankService } from 'src/bank/bank.service';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios

@Controller('files')
export class FilesController {
  constructor(private readonly bankService: BankService) {}

  @Get('logo')
  async getLogo(@Res() res: Response) {
    try {
      const bank = await this.bankService.getBank();
      if (!bank || !bank.bank.avatar) {
        return res.status(404).send('Bank or logo not found');
      }

      const url = bank.bank.avatar; // URL del recurso (imagen)

      // Realizar la solicitud HTTP para obtener la imagen
      const response = await axios.get(url, {
        responseType: 'stream', // Obtener la respuesta como stream
      });

      // Verificar que el contenido es una imagen
      const contentType = response.headers['content-type'];
      if (!contentType.startsWith('image/')) {
        return res.status(400).send('Invalid content type, expected an image');
      }

      // Configurar las cabeceras de la respuesta
      res.set({
        'Content-Type': contentType,
        'Content-Disposition': 'inline; filename="logo"', // Mostrar en el navegador
      });

      // Enviar el stream de la imagen directamente al cliente
      response.data.pipe(res);
    } catch (error) {
      console.error('Error fetching logo:', error.message);
      return res.status(500).send('Error retrieving logo');
    }
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.sendFile(filePath);
  }
}
