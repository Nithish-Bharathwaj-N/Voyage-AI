import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlanTripDto } from './plan-trip.dto';
import { Itinerary } from '../interfaces/itinerary.interface';

export class RegenerateTripDto {
  @ApiProperty({ description: 'Day number to regenerate (1-indexed)', example: 2 })
  @IsInt()
  @Min(1)
  dayNumber: number;

  @ApiPropertyOptional({
    description: 'Specific activity name or index to replace',
    example: 'Eiffel Tower Tour',
  })
  @IsString()
  @IsOptional()
  activityName?: string;

  @ApiProperty({ description: 'Original trip configuration context' })
  @ValidateNested()
  @Type(() => PlanTripDto)
  context: PlanTripDto;

  @ApiProperty({ description: 'The current full itinerary structure' })
  @IsNotEmpty()
  itinerary: Itinerary;
}
