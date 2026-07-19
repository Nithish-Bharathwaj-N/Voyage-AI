import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({ example: 'Eiffel Tower' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 48.8584, required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 2.2945, required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;

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

  @ApiProperty({ example: '2026-07-01T10:00:00.000Z', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  arrivalDate?: Date;

  @ApiProperty({ example: '2026-07-03T18:00:00.000Z', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  departureDate?: Date;

  @ApiProperty({ example: 'Requires ticket bookings in advance.', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  order: number;
}

export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {}

export class DestinationResponseData {
  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  id: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  tripId: string;

  @ApiProperty({ example: 'Eiffel Tower' })
  name: string;

  @ApiProperty({ example: 48.8584, nullable: true })
  latitude: number | null;

  @ApiProperty({ example: 2.2945, nullable: true })
  longitude: number | null;

  @ApiProperty({ example: 'France', nullable: true })
  country: string | null;

  @ApiProperty({ example: 'Paris', nullable: true })
  city: string | null;

  @ApiProperty({ example: '2026-07-01T10:00:00.000Z', nullable: true })
  arrivalDate: Date | null;

  @ApiProperty({ example: '2026-07-03T18:00:00.000Z', nullable: true })
  departureDate: Date | null;

  @ApiProperty({ example: 'Requires ticket bookings in advance.', nullable: true })
  notes: string | null;

  @ApiProperty({ example: 0 })
  order: number;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  updatedAt: Date;
}

export class DestinationResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: DestinationResponseData })
  data: DestinationResponseData;
}

export class DestinationsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: [DestinationResponseData] })
  data: DestinationResponseData[];
}
