import { BadRequestException, Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Between, In, Like, Repository } from 'typeorm';
import { MulterDiskUploadedFiles } from '../../types';
import { storageDir } from '../../utils/storage';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { DiscountsService } from '../discounts/discounts.service';
import { PublishersService } from '../publishers/publishers.service';
import { User } from '../user/entities/user.entity';
import { AddEbookDto } from './dto/add-ebook.dto';
import { FilterEbookQueryDto } from './dto/filter-ebook-query.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Cover } from './entities/cover.entity';
import { Ebook } from './entities/ebook.entity';

@Injectable()
export class EbooksService {
  constructor(
    @Inject(forwardRef(() => AuthorsService)) private authorService: AuthorsService,
    @Inject(forwardRef(() => CategoriesService)) private categoryService: CategoriesService,
    @Inject(forwardRef(() => DiscountsService)) private discountService: DiscountsService,
    @Inject(forwardRef(() => PublishersService)) private publisherService: PublishersService,
    @InjectRepository(Ebook)
    private ebooksRepository: Repository<Ebook>,
  ) { }

  async update(ebook_id: string, upEbookData: UpdateEbookDto, files: MulterDiskUploadedFiles) {
    const photo = files?.cover ?? [];

    try {
      const currEbook = await this.ebooksRepository.findOne({
        where: { ebook_id },
        relations: {
          cover: true,
          author: true,
          category: true,
          discount: true,
        }
      });

      if (!currEbook) return 'Record not found';

      for (const prop in upEbookData) {
        if (typeof upEbookData[prop] !== 'object' && typeof upEbookData[prop] !== 'function') {
          currEbook[prop] = upEbookData[prop];
        } else {
          const service = this[prop + 'Service'];
          if (service && typeof service?.updateMany === 'function') {
            currEbook[prop] = await service.updateMany(upEbookData[prop], { entityOnly: true });
          } else {
            throw new BadRequestException(`Service ${prop}Service or method updateMany does not exist`);
          }
        }
      }


      if (photo.length) {
        photo.forEach(newElem => {
          const newPhoto = new Cover();
          newPhoto.cover_id = newElem.filename;
          newPhoto.cover_name = newElem.originalname;
          newPhoto.cover_size = newElem.size;
          currEbook.cover.push(newPhoto);
        })
      }
      const res = await this.ebooksRepository.save(currEbook);

      return res;

    }
    catch (error) {
      try {
        if (photo) {
          photo.forEach((item) => {
            fs.unlink(path.join(storageDir(item.fieldname), item.filename), (err) => {
              if (err) throw err;
              console.log(`file ${item.filename} was deleted`);
            });
          })

        }
      } catch (error2) {
        throw error2
      }
      throw error;
    }
  }


  async filter(filterConditions: FilterEbookQueryDto): Promise<Ebook[]> {
    const { phrase, maxPrice, minPrice, sorting, limit, page, category } = filterConditions;
    const skip = (page - 1) * limit;
    try {
      const res = await this.ebooksRepository.find({
        where: [
          {
            title: Like(`%${phrase}%`),
            price: Between(minPrice, maxPrice),
            category: {
              category_name: Like(`%${category}%`),
            },
          },
          {
            price: Between(minPrice, maxPrice),
            author: {
              author_name: Like(`%${phrase}%`),
            },
            category: {
              category_name: Like(`%${category}%`),
            },
          },
        ],
        order: {
          price: sorting,
        },
        take: limit,
        skip: skip,
        relations: {
          publisher: true,
          cover: true,
          author: true,
          category: true,
          discount: true,
        }
      });

      return res;
    } catch (error) {
      throw error;
    }
  }


  async addEbook(req: AddEbookDto, files: MulterDiskUploadedFiles) {
    const photo = files?.cover ?? [];
    const product = files?.product ?? [];

    try {
      const ebook = this.ebooksRepository.create();

      for (const prop in req) {
        const service = this[`${prop}Service`];

        if (typeof req[prop] !== 'object' && typeof req[prop] !== 'function') {
          ebook[prop] = req[prop];
        } else if (Array.isArray(req[prop])) {
          if (service && typeof service?.findMany === 'function') {
            ebook[prop] = await service.findMany(req[prop]);
          } else {
            throw new BadRequestException(`Service ${prop}Service or method findMany does not exist`);
          }
        } else {
          if (service && typeof service?.findOne === 'function') {
            ebook[prop] = await service.findOne(req[prop]);
          } else {
            throw new BadRequestException(`Service ${prop}Service or method findOne does not exist`);
          }
        }
      }

      if (photo.length) {
        ebook.cover = [];
        photo.forEach(newElem => {
          const newPhoto = new Cover();
          newPhoto.cover_id = newElem.filename;
          newPhoto.cover_name = newElem.originalname;
          newPhoto.cover_size = newElem.size;
          ebook.cover.push(newPhoto);
        })
      }

      if (product.length) {
        product.forEach(newElem => {
          ebook.file = newElem.filename;
        })
      }


      try {
        const res = await this.ebooksRepository.save(ebook);
        return res;
      } catch (DBError) {
        throw new InternalServerErrorException('A database error occurred');
      }
    } catch (error) {
      try {
        if (photo) {
          photo.forEach((item) => {
            fs.unlink(path.join(storageDir(item.fieldname), item.filename), (err) => {
              if (err) throw err;
              console.log(`file ${item.filename} was deleted`);
            });
          })
        }

        if (product) {
          product.forEach((item) => {
            fs.unlink(path.join(storageDir(item.fieldname), item.filename), (err) => {
              if (err) throw err;
              console.log(`file ${item.filename} was deleted`);
            });
          })
        }

      } catch (error2) {
        throw error2
      }
      throw error;
    }

  }

  async findByIds(ebook_ids: string[]) {
    return await this.ebooksRepository.findBy({ ebook_id: In(ebook_ids) });
  }

  async getPhoto(ebook_id: string, res: any) {
    try {
      const product = await this.ebooksRepository.findOne({
        where: { ebook_id },
        relations: {
          cover: true
        }
      })

      if (!product) throw new Error('No object found!');
      if (!product.cover) throw new Error('No photo in this entity!');

      res.sendFile(
        `${product.cover[0].cover_id}${path.extname(product.cover[0].cover_name)}`,
        {
          root: storageDir('cover')
        },
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async getEbookFile(ebook_id: string, user: User, res: any) {
    try {
      const customerEbooks = user?.order?.map((item) => item.orderItem.map((elem) => elem.ebook.ebook_id)).flat();
      if (!customerEbooks.includes(ebook_id)) throw new Error('No access to this file!');
      const product = await this.ebooksRepository.findOneBy({ ebook_id });
      if (!product) throw new Error('No object found!');
      if (!product.file) throw new Error('No file in this entity!');

      res.sendFile(
        product.file,
        {
          root: storageDir('ebook')
        },
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

}