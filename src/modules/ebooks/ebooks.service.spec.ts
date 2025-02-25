import { Test, TestingModule } from '@nestjs/testing';
import { EbooksService } from './ebooks.service';

describe('EbooksService', () => {
  let service: EbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbooksService],
    }).compile();

    service = module.get<EbooksService>(EbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update ebook properties', async () => {
      const ebook_id = 'test_id';
      const upEbookData = { title: 'New Title' };
      const files = {};

      const ebook = { title: 'Old Title' };
      service['ebooksRepository'].findOne = jest.fn().mockResolvedValue(ebook);
      service['ebooksRepository'].save = jest.fn().mockResolvedValue({ ...ebook, ...upEbookData });

      const result = await service.update(ebook_id, upEbookData, files);

      expect(service['ebooksRepository'].findOne).toHaveBeenCalledWith({
        where: { ebook_id },
        relations: {}
      });
      expect(service['ebooksRepository'].save).toHaveBeenCalledWith({ ...ebook, ...upEbookData });
      expect(result).toEqual({ ...ebook, ...upEbookData });
    });

    it('should handle related entities', async () => {
      const ebook_id = 'test_id';
      const upEbookData = { author: [{ author_name: 'New Author' }] };
      const files = {};

      const ebook = { author: { name: 'Old Author' } };
      service['ebooksRepository'].findOne = jest.fn().mockResolvedValue(ebook);
      service['authorService'].updateMany = jest.fn().mockResolvedValue(upEbookData.author);
      service['ebooksRepository'].save = jest.fn().mockResolvedValue({ ...ebook, ...upEbookData });

      const result = await service.update(ebook_id, upEbookData, files);

      expect(service['ebooksRepository'].findOne).toHaveBeenCalledWith({
        where: { ebook_id },
        relations: { author: true }
      });
      expect(service['authorService'].updateMany).toHaveBeenCalledWith(upEbookData.author, { entityOnly: true });
      expect(service['ebooksRepository'].save).toHaveBeenCalledWith({ ...ebook, ...upEbookData });
      expect(result).toEqual({ ...ebook, ...upEbookData });
    });

    it('should handle file uploads', async () => {
      const ebook_id = 'test_id';
      const upEbookData = {};
      const files = { cover: [{ filename: 'test.jpg', originalname: 'Test', size: 1234 }] };

      const ebook = { cover: [] };
      service['ebooksRepository'].findOne = jest.fn().mockResolvedValue(ebook);
      service['ebooksRepository'].save = jest.fn().mockResolvedValue({ ...ebook, cover: files.cover });

      const result = await service.update(ebook_id, upEbookData, files);

      expect(service['ebooksRepository'].findOne).toHaveBeenCalledWith({
        where: { ebook_id },
        relations: {}
      });
      expect(service['ebooksRepository'].save).toHaveBeenCalledWith({ ...ebook, cover: files.cover });
      expect(result).toEqual({ ...ebook, cover: files.cover });
    });

    it('should handle errors', async () => {
      const ebook_id = 'test_id';
      const upEbookData = {};
      const files = {};

      service['ebooksRepository'].findOne = jest.fn().mockRejectedValue(new Error('Test error'));

      await expect(service.update(ebook_id, upEbookData, files)).rejects.toThrow('Test error');
    });
  });
});
