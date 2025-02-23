import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { tryJsonParse } from "../../utils/tryJsonParse";
import { EbookDto } from "./ebook.dto";

export class AddEbookDto extends OmitType(EbookDto, ['author', 'discount', 'publisher', 'category', 'ebook_id', 'cover'] as const) {
  @ApiProperty({ 
    description: "Lista autorów - identyfikatory lub nazwy", 
    type: [String], 
    example: ["autor1", "autor2"] 
  })
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @Transform(({ value }) => tryJsonParse(value))
  author: string[];

  @ApiProperty({ 
    description: "Lista zniżek - identyfikatory lub kody zniżkowe", 
    type: [String], 
    example: ["zniżka1", "zniżka2"] 
  })
  @Expose()
  @IsArray()
  @Transform(({ value }) => tryJsonParse(value))
  discount: string[];

  @ApiProperty({ 
    description: "Nazwa lub identyfikator wydawcy", 
    example: "wydawca1" 
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  publisher: string;

  @ApiProperty({ 
    description: "Lista kategorii - identyfikatory lub nazwy", 
    type: [String], 
    example: ["kategoria1", "kategoria2"] 
  })
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @Transform(({ value }) => tryJsonParse(value))
  category: string[];
}
