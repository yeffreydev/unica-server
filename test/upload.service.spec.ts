import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from 'src/upload/upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('removeFile', () => {
    it('should return true if is remove file', () => {
      const path = 'uploads/defaultlogo.png';
      const result = service.removeFile(path);

      expect(result).toEqual(true);
    });

    it('should throw an error if no file is provided', () => {
      expect(() => service.handleFileUpload(null)).toThrow('No file removed');
    });
  });
  //   describe('handleFileUpload', () => {
  //     it('should return file details for a valid file', () => {
  //       const mockFile: Express.Multer.File = {
  //         fieldname: 'file',
  //         originalname: 'test.jpg',
  //         encoding: '7bit',
  //         mimetype: 'image/jpeg',
  //         size: 123456,
  //         destination: './uploads',
  //         filename: 'file-1697051234567-123456789.jpg',
  //         path: 'uploads/file-1697051234567-123456789.jpg',
  //         buffer: Buffer.from(''),
  //       };

  //       const result = service.handleFileUpload(mockFile);

  //       expect(result).toEqual({
  //         filename: mockFile.filename,
  //         path: mockFile.path,
  //         size: mockFile.size,
  //       });
  //     });

  //     it('should throw an error if no file is provided', () => {
  //       expect(() => service.handleFileUpload(null)).toThrow('No file uploaded');
  //     });
  //   });
});
