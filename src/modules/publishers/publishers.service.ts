import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) { }
  create(createPublisherDto: CreatePublisherDto) {
    return 'This action adds a new publisher';
  }

  findAll() {
    return `This action returns all publishers`;
  }

  async findOne(key: string) {
    const res = await this.publisherRepository.findOne({
      where: [{ publisher_id: key }, { publisher_name: key }],
    });

    if (!res) throw new Error('Record not found');

    return res;
  }

  async update(publisher_id: string, updateDto: UpdatePublisherDto, options = { entityOnly: false }) {
    try {
      const currPublisher = await this.publisherRepository.findOne({
        where: { publisher_id },
      });

      for (const prop in updateDto) {
        currPublisher[prop] = updateDto[prop];
      }

      const res = options.entityOnly ? currPublisher : await this.publisherRepository.save(currPublisher);
      return res;
    }
    catch (error) {
      throw error;
    }
  }

  async updateMany(updateData: UpdatePublisherDto[], options = { entityOnly: false }) {
    try {
      const res = await Promise.all(updateData.map(async (obj) => {
        const updatedObj = await this.update(obj.publisher_id, obj, options);
        return updatedObj;
      }));

      return res;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
