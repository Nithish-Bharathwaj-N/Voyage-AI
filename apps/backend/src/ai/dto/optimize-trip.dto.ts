import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Itinerary } from '../interfaces/itinerary.interface';

export class OptimizeTripDto {
  @ApiProperty({ description: 'The itinerary to optimize' })
  @IsNotEmpty()
  itinerary: Itinerary;

  @ApiProperty({
    description: 'Specific targets for optimization (e.g. Distance, Budget, Time)',
    example: ['Distance', 'Budget'],
  })
  @IsArray()
  @IsOptional()
  targets?: string[] = ['Distance'];
}
