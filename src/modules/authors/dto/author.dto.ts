import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

export class AuthorDto {
  @ApiProperty({
    description: "Unique identifier of the author",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @Expose()
  @IsUUID()
  author_id: string;

  @ApiProperty({
    description: "Name of the author",
    example: "J.R.R. Tolkien",
  })
  @Expose()
  @IsString()
  author_name: string;
}
