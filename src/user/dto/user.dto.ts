import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class UserDto {
  @Expose()
  @IsString()
  @ApiProperty({ description: "Unique user ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  user_id: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Username of the user", example: "john_doe" })
  username: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "First name of the user", example: "John" })
  firstName: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Last name of the user", example: "Doe" })
  lastName: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Date of birth (YYYY-MM-DD)", example: "1990-05-15" })
  dateOfBirth: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "User's phone number", example: "+48123456789" })
  phoneNumber: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "User's address", example: "123 Main St, Apt 4B" })
  address: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "City of residence", example: "Warsaw" })
  city: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Postal code", example: "00-001" })
  zip: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "User's email address", example: "john.doe@example.com" })
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Hashed password", example: "$2b$10$..." })
  pwdHash: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "User role (e.g., 'admin', 'user')", example: "user" })
  role: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Current authentication token ID", example: "null", nullable: true })
  currentTokenId: string | null;
}
