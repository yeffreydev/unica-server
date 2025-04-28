// file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return {
      filename: file.filename,
      path: file.path,
      size: file.size,
    };
  }

  removeFile(filePath: string): boolean {
    try {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting file:', err);
      return false;
    }
  }
}
