import { PartialType } from '@nestjs/mapped-types';
import { PublisherDto } from './publisher.dto';

export class UpdatePublisherDto extends PartialType(PublisherDto) { }
