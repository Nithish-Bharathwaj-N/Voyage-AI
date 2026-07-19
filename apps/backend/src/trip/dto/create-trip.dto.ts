import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDate,
  IsEnum,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TripVisibility } from '@prisma/client';

export class CreateTripDto {
  @ApiProperty({ example: 'Summer Vacation in Paris' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Exploring museums and cafes in France.', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'https://example.com/paris.jpg', required: false })
  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '2026-07-15T00:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    enum: TripVisibility,
    example: TripVisibility.PRIVATE,
    default: TripVisibility.PRIVATE,
  })
  @IsEnum(TripVisibility)
  @IsOptional()
  visibility?: TripVisibility;

  @ApiProperty({ example: 'USD', default: 'USD' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({ example: 2500, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  estimatedBudget?: number;

  @ApiProperty({ example: 'France', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiProperty({ example: 'Paris', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @ApiProperty({ example: 'Europe/Paris', default: 'UTC' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  timezone?: string;
}
