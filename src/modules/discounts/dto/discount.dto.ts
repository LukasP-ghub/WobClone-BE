import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class DiscountDto {
  @ApiProperty({
    description: "Unikalny identyfikator zniżki",
    required: false,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  discount_id: string;

  @ApiProperty({
    description: "Nazwa zniżki",
    example: "Holiday Sale",
  })
  @Expose()
  @IsString()
  discount_name: string;

  @ApiProperty({
    description: "Wartość zniżki",
    example: 15.5,
  })
  @Expose()
  @IsNumber()
  discount_value: number;
}
