import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) { }
  create(createDiscountDto: CreateDiscountDto) {
    return 'This action adds a new discound';
  }

  findAll() {
    return `This action returns all discounds`;
  }

  async findOne(key: string) {
    const res = await this.discountRepository.findOne({
      where: [{ discount_id: key }, { discount_name: key }],
    });

    if (!res) throw new Error('Record not found');
    return res;

  }

  async findMany(keys: string[]) {
    try {
      const discounts = await this.discountRepository.find({
        where: { discount_id: In(keys) }
      });

      return discounts;

    } catch (error) {
      throw error;
    }
  }

  async update(discount_id: string, updateDiscountDto: UpdateDiscountDto, options = { entityOnly: false }) {
    try {
      const currDiscount = await this.discountRepository.findOne({
        where: { discount_id },
      });

      for (const prop in updateDiscountDto) {
        currDiscount[prop] = updateDiscountDto[prop];
      }

      const res = options.entityOnly ? currDiscount : await this.discountRepository.save(currDiscount);
      return res;
    }
    catch (error) {
      throw error;
    }
  }

  async updateMany(updateDiscounts: UpdateDiscountDto[], options = { entityOnly: false }) {
    try {
      const res = await Promise.all(updateDiscounts.map(async (updateDiscount) => {
        const updatedDiscount = await this.update(updateDiscount.discount_id, updateDiscount, options);
        return updatedDiscount;
      }));

      return res;
    } catch (error) {
      throw error;
    }
  }


  remove(id: number) {
    return `This action removes a #${id} discound`;
  }
}
