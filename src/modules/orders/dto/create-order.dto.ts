import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Unique identifier of the order',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({
    description: 'List of product IDs included in the order',
    example: ['prod-123', 'prod-456'],
    type: [String]
  })
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  products_ids: string[];

  @ApiProperty({
    description: 'Payment method used for the order',
    example: 'credit_card'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({
    description: 'Optional discount code applied to the order',
    example: 'DISCOUNT10',
    required: false
  })
  @Expose()
  @IsOptional()
  @IsString()
  discount_code: string;

  @ApiProperty({
    description: 'Delivery address for the order',
    example: '123 Main Street, City, Country'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Postal code for the delivery address',
    example: '35-001'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(5, 10)
  zip: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+48 600 700 800'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('pl-PL')
  phoneNumber: string;
}
