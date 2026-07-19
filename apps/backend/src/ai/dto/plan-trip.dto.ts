import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  IsInt,
  MinLength,
} from 'class-validator';

export class PlanTripDto {
  @ApiProperty({ description: 'Target destination city or country', example: 'Paris, France' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  destination: string;

  @ApiProperty({ description: 'Start date of the trip (ISO YYYY-MM-DD)', example: '2026-07-10' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date of the trip (ISO YYYY-MM-DD)', example: '2026-07-15' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Maximum budget for the entire trip', example: 2500 })
  @IsNumber()
  @Min(0)
  budget: number;

  @ApiPropertyOptional({
    description: 'Three-letter currency code',
    example: 'USD',
    default: 'USD',
  })
  @IsString()
  @IsOptional()
  currency?: string = 'USD';

  @ApiProperty({ description: 'Number of travelers', example: 2 })
  @IsInt()
  @Min(1)
  travelerCount: number;

  @ApiPropertyOptional({ description: 'Ages of the travelers', example: [30, 28] })
  @IsArray()
  @IsOptional()
  travelerAges?: number[];

  @ApiPropertyOptional({
    description: 'Preferred travel style (e.g. Adventure, Relaxed, Cultural)',
    example: 'Cultural',
  })
  @IsString()
  @IsOptional()
  travelStyle?: string;

  @ApiPropertyOptional({
    description: 'Dietary preferences or restrictions',
    example: ['Vegetarian'],
  })
  @IsArray()
  @IsOptional()
  foodPreferences?: string[];

  @ApiPropertyOptional({
    description: 'Specific user interests',
    example: ['Art Museums', 'Local History', 'Architecture'],
  })
  @IsArray()
  @IsOptional()
  interests?: string[];

  @ApiPropertyOptional({ description: 'Accessibility requirements', example: [] })
  @IsArray()
  @IsOptional()
  accessibilityNeeds?: string[];

  @ApiPropertyOptional({ description: 'Transportation preference', example: 'Public Transport' })
  @IsString()
  @IsOptional()
  transportationPreference?: string;

  @ApiPropertyOptional({ description: 'Accommodation preference', example: 'Boutique Hotel' })
  @IsString()
  @IsOptional()
  accommodationPreference?: string;

  @ApiPropertyOptional({
    description: 'Expected working/sightseeing hours in a day',
    example: '09:00-18:00',
  })
  @IsString()
  @IsOptional()
  workingHours?: string;

  @ApiPropertyOptional({
    description: 'Preferred communication languages',
    example: ['English', 'French'],
  })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @ApiPropertyOptional({
    description: 'Citizenship country for visa checks',
    example: 'United States',
  })
  @IsString()
  @IsOptional()
  visaCountry?: string;
}
