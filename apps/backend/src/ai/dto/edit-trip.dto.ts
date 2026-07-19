import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Itinerary } from '../interfaces/itinerary.interface';

export class EditTripDto {
  @ApiProperty({ description: 'The original itinerary structure to patch' })
  @IsNotEmpty()
  itinerary: Itinerary;

  @ApiProperty({
    description:
      'The natural language instruction from the user (e.g. "Avoid museums", "Move to Day 2")',
    example: 'Remove all museums and add nightlife',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
