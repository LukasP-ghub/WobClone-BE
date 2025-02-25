import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class RegisterDto {
  @Expose()
  @IsString()
  @ApiProperty({ description: "User's email address", example: "user@example.com" })
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "User's password", example: "securePassword123" })
  pwd: string;
}
