import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import {
  ArrayMinSize, ArrayNotEmpty, IsAlpha, IsArray, IsDateString, IsNotEmpty,
  IsNotEmptyObject, IsNumber, IsObject, IsString, Max,
  Min,
  ValidateNested
} from "class-validator";
import { AuthorDto } from "../../authors/dto/author.dto";
import { CategoryDto } from "../../categories/dto/category.dto";
import { DiscountDto } from "../../discounts/dto/discount.dto";
import { PublisherDto } from "../../publishers/dto/publisher.dto";
import { tryJsonParse } from "../../utils/tryJsonParse";
import { CoverDto } from "./cover.dto";

export class EbookDto {
  @ApiProperty({ description: "Unique identifier of the ebook" })
  @Expose()
  ebook_id: string;

  @ApiProperty({ type: CoverDto, description: "Cover details of the ebook" })
  @Expose()
  @Type(() => CoverDto)
  cover: CoverDto;

  @ApiProperty({ description: "Title of the ebook", example: "Example Title" })
  @Expose()
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "Number of pages", example: 300 })
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
  @Min(1)
  pages: number;

  @ApiProperty({ description: "Publication date", example: "2023-06-15" })
  @Expose()
  @IsDateString()
  publication_date: string;

  @ApiProperty({ description: "Description of the ebook" })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({ description: "Price of the ebook", example: 29.99 })
  @Expose()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @Min(0)
  @Max(999)
  price: number;

  @ApiProperty({ description: "Language code", example: "en" })
  @Expose()
  @IsString()
  @IsNotEmpty()
  language_code: string;

  @ApiProperty({ description: "Language name", example: "English" })
  @Expose()
  @IsString()
  @IsNotEmpty()
  language_name: string;

  @ApiProperty({ type: PublisherDto, description: "Publisher details" })
  @Expose()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @Transform(({ value }) =>
    plainToInstance(PublisherDto, tryJsonParse(value), {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    })
  )
  @ValidateNested()
  @Type(() => PublisherDto)
  publisher: PublisherDto;

  @ApiProperty({ type: [AuthorDto], description: "List of authors" })
  @Expose()
  @Transform(({ value }) =>
    plainToInstance(AuthorDto, tryJsonParse(value), {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    })
  )
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthorDto)
  author: AuthorDto[];

  @ApiProperty({ type: [CategoryDto], description: "List of categories" })
  @Expose()
  @Transform(({ value }) =>
    plainToInstance(CategoryDto, tryJsonParse(value), {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    })
  )
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  category: CategoryDto[];

  @ApiProperty({ type: [DiscountDto], description: "List of discounts" })
  @Expose()
  @Transform(({ value }) =>
    plainToInstance(DiscountDto, tryJsonParse(value), {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    })
  )
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DiscountDto)
  discount: DiscountDto[];
}
