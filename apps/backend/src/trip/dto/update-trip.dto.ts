import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TripStatus } from '@prisma/client';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @ApiProperty({ enum: TripStatus, required: false })
  @IsEnum(TripStatus)
  @IsOptional()
  status?: TripStatus;
}
