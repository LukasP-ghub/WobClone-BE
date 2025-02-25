import { PartialType } from '@nestjs/mapped-types';
import { DiscountDto } from './discount.dto';

export class UpdateDiscountDto extends PartialType(DiscountDto) { }
