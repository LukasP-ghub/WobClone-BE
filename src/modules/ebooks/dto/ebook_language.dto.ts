import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class EbookLanguageDto {
  @ApiProperty({
    description: "Unikalny identyfikator języka",
    required: false,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  language_id: string;

  @ApiProperty({
    description: "Nazwa języka",
    example: "English",
  })
  @Expose()
  @IsString()
  language_name: string;

  @ApiProperty({
    description: "Kod języka",
    example: "en",
  })
  @Expose()
  @IsString()
  language_code: string;
}
