import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CategoryDto {
  @ApiProperty({
    description: "Unikalny identyfikator kategorii",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Expose()
  @IsUUID()
  category_id: string;

  @ApiProperty({
    description: "Nazwa kategorii",
    example: "Science Fiction",
  })
  @Expose()
  @IsString()
  category_name: string;

  @ApiProperty({
    description: "Flaga określająca, czy kategoria jest popularna",
    example: true,
  })
  @Expose()
  @IsBoolean()
  popular: boolean;
}
