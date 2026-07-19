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

export class CreateActivityDto {
  @ApiProperty({ example: '参观卢浮宫 (Louvre Museum Tour)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Guided tour of main exhibits.', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'Louvre Museum Entrance', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  locationName?: string;

  @ApiProperty({ example: 48.8606, required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 2.3376, required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: '2026-07-02T09:00:00.000Z', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ example: '2026-07-02T12:00:00.000Z', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endTime?: Date;

  @ApiProperty({ example: 22, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cost?: number;

  @ApiProperty({ example: 'Book online using museum pass.', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  order: number;
}

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class ActivityResponseData {
  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  id: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  destinationId: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  tripId: string;

  @ApiProperty({ example: '参观卢浮宫 (Louvre Museum Tour)' })
  name: string;

  @ApiProperty({ example: 'Guided tour of main exhibits.', nullable: true })
  description: string | null;

  @ApiProperty({ example: 'Louvre Museum Entrance', nullable: true })
  locationName: string | null;

  @ApiProperty({ example: 48.8606, nullable: true })
  latitude: number | null;

  @ApiProperty({ example: 2.3376, nullable: true })
  longitude: number | null;

  @ApiProperty({ example: '2026-07-02T09:00:00.000Z', nullable: true })
  startTime: Date | null;

  @ApiProperty({ example: '2026-07-02T12:00:00.000Z', nullable: true })
  endTime: Date | null;

  @ApiProperty({ example: 22, nullable: true })
  cost: number | null;

  @ApiProperty({ example: 'Book online using museum pass.', nullable: true })
  notes: string | null;

  @ApiProperty({ example: 0 })
  order: number;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  updatedAt: Date;
}

export class ActivityResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: ActivityResponseData })
  data: ActivityResponseData;
}

export class ActivitiesResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: [ActivityResponseData] })
  data: ActivityResponseData[];
}
