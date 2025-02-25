import { OmitType } from "@nestjs/mapped-types";
import { AuthorDto } from "./author.dto";

export class CreateAuthorDto extends OmitType(AuthorDto, ['author_id'] as const) { }
