import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) { }

  async create(req: CreateAuthorDto) {
    try {
      const author = this.authorRepository.create(req);
      const res = await this.authorRepository.save(author);
      return res;

    } catch (error) {
      throw error;
    }
  }

  async findMany(keys: string[]) {
    try {
      const authors = await this.authorRepository.find({
        where: { author_id: In(keys) }
      });

      return authors;

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const authors = await this.authorRepository.find();
      return authors;

    } catch (error) {
      throw error;
    }
  }

  async findOne(key: string) {
    try {
      const author = await this.authorRepository.findOne({
        where: [{ author_id: key }, { author_name: key }],
      });

      if (!author) throw new Error('Record not found');
      return author;

    } catch (error) {
      throw error;
    }
  }

  async update(author_id: string, updateAuthorDto: UpdateAuthorDto, options = { entityOnly: false }) {
    try {
      const currAuthor = await this.authorRepository.findOne({
        where: { author_id },
      });

      for (const prop in updateAuthorDto) {
        currAuthor[prop] = updateAuthorDto[prop];
      }

      const res = options.entityOnly ? currAuthor : await this.authorRepository.save(currAuthor);
      return res;
    }
    catch (error) {
      throw error;
    }
  }

  async updateMany(updateAuthors: UpdateAuthorDto[], options = { entityOnly: false }) {
    try {
      const res = await Promise.all(updateAuthors.map(async (updateAuthor) => {
        const updatedAuthor = await this.update(updateAuthor.author_id, updateAuthor, options);
        return updatedAuthor;
      }));

      return res;
    } catch (error) {
      throw error;
    }
  }

}
