import { PartialType } from '@nestjs/mapped-types';
import { EbookDto } from './ebook.dto';


export class UpdateEbookDto extends PartialType(EbookDto) {

}
