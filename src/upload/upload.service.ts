import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  async postToCloudinary(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(
              new Error(
                `Error al subir la imagen a Cloudinary: ${error.message}`,
              ),
            );
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
          });
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
