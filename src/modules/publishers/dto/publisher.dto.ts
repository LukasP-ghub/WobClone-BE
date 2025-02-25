import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class PublisherDto {
  @ApiProperty({
    description: "Unikalny identyfikator wydawcy",
    required: false,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  publisher_id: string;

  @ApiProperty({
    description: "Nazwa wydawcy",
    example: "Wydawnictwo XYZ",
  })
  @Expose()
  @IsString()
  publisher_name: string;
}
