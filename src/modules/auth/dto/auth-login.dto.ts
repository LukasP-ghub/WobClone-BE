import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class AuthLoginDto {
  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  pwd: string;
}