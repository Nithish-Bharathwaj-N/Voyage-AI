import { ApiProperty } from '@nestjs/swagger';
import { TripStatus, TripVisibility } from '@prisma/client';

export class TripResponseData {
  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  id: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  ownerId: string;

  @ApiProperty({ example: 'Summer Vacation in Paris' })
  title: string;

  @ApiProperty({ example: 'Exploring museums and cafes in France.', nullable: true })
  description: string | null;

  @ApiProperty({ example: 'https://example.com/paris.jpg', nullable: true })
  coverImage: string | null;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2026-07-15T00:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ enum: TripStatus, example: TripStatus.PLANNING })
  status: TripStatus;

  @ApiProperty({ enum: TripVisibility, example: TripVisibility.PRIVATE })
  visibility: TripVisibility;

  @ApiProperty({ example: 'USD' })
  currency: string;

  @ApiProperty({ example: 2500, nullable: true })
  estimatedBudget: number | null;

  @ApiProperty({ example: 0, nullable: true })
  actualBudget: number | null;

  @ApiProperty({ example: 'France', nullable: true })
  country: string | null;

  @ApiProperty({ example: 'Paris', nullable: true })
  city: string | null;

  @ApiProperty({ example: 'Europe/Paris', nullable: true })
  timezone: string | null;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  updatedAt: Date;
}

export class TripResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: TripResponseData })
  data: TripResponseData;
}

export class TripsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: [TripResponseData] })
  data: TripResponseData[];
}
