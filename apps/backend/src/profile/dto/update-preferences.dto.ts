import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiProperty({ example: 'Adventure', required: false })
  @IsString()
  @IsOptional()
  travelStyle?: string;

  @ApiProperty({ example: 'Mid-range', required: false })
  @IsString()
  @IsOptional()
  budgetRange?: string;

  @ApiProperty({ example: 'Temperate', required: false })
  @IsString()
  @IsOptional()
  preferredClimate?: string;

  @ApiProperty({ example: ['Hiking', 'Sightseeing'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  favoriteActivities?: string[];

  @ApiProperty({ example: 'Train', required: false })
  @IsString()
  @IsOptional()
  preferredTransport?: string;

  @ApiProperty({ example: ['Vegetarian'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  dietaryPreferences?: string[];

  @ApiProperty({ example: ['Wheelchair Access'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  accessibilityNeeds?: string[];

  @ApiProperty({ example: 'Family', required: false })
  @IsString()
  @IsOptional()
  travelCompanions?: string;

  @ApiProperty({ example: 'United States', required: false })
  @IsString()
  @IsOptional()
  passportCountry?: string;
}
