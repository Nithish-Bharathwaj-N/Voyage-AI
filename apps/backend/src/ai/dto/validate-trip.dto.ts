import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Itinerary } from '../interfaces/itinerary.interface';

export class ValidateTripDto {
  @ApiProperty({ description: 'The itinerary JSON structure to validate' })
  @IsNotEmpty()
  itinerary: Itinerary;
}
