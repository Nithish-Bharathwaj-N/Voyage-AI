/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsString, IsObject, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripFromItineraryDto {
  @ApiProperty({ description: 'AI-generated itinerary object' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @IsObject()
  itinerary: Record<string, any>;

  @ApiProperty({ description: 'Trip start date (ISO 8601)' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Trip end date (ISO 8601)' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimatedBudget?: number;
}
