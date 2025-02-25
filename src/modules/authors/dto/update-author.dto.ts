import { PartialType } from '@nestjs/mapped-types';
import { AuthorDto } from './author.dto';

export class UpdateAuthorDto extends PartialType(AuthorDto) { }
