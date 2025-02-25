import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Sorting } from "../../../types";


export class FilterEbookDto {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty(
    {
      type: String,
      description: 'The search phrase',
      example: 'Test Ebook Title',
      required: false
    }
  )
  phrase: string = '';

  @Expose()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @Min(0)
  @Max(999)
  @ApiProperty(
    {
      type: Number,
      description: 'The maximum price of the ebook',
      example: 20.99,
      required: false,
      maximum: 999,
      minimum: 0
    }
  )
  maxPrice: number = 999;

  @Expose()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @Min(0)
  @Max(999)
  @ApiProperty(
    {
      type: Number,
      description: 'The minimum price of the ebook',
      example: 10.99,
      required: false,
      maximum: 999,
      minimum: 0
    }
  )
  minPrice: number = 0;

  @Expose()
  @IsOptional()
  @IsEnum(Sorting)
  @ApiProperty(
    {
      type: String,
      description: 'The sorting order of the ebooks',
      example: 'ASC',
      required: false
    }
  )
  sorting: Sorting = Sorting.ASC;

  @Expose()
  @IsOptional()
  @IsNumber()
  @ApiProperty(
    {
      type: Number,
      description: 'The number of ebooks to return',
      example: 10,
      required: false
    }
  )
  limit: number = 10;

  @Expose()
  @IsOptional()
  @IsNumber()
  @ApiProperty(
    {
      type: Number,
      description: 'The page number to return',
      example: 1,
      required: false
    }
  )
  page: number = 1;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty(
    {
      type: String,
      description: 'The category name of the ebook',
      example: 'Science Fiction',
      required: false
    }
  )
  category: string = '';
}