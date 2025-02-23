import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CoverDto {
  @ApiProperty({ 
    description: "Unikalny identyfikator okładki", 
    required: false, 
    example: "e2d3b9e2-8c5b-4f5a-8f93-19e2f8b1a6d4" 
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cover_id: string;

  @ApiProperty({ 
    description: "Nazwa okładki", 
    example: "Okładka ebooka" 
  })
  @Expose()
  @IsString()
  cover_name: string;

  @ApiProperty({ 
    description: "Rozmiar okładki w bajtach", 
    example: 204800 
  })
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
  cover_size: number;
}
