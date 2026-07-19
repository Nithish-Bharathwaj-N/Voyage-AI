import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOnboardingDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isOnboarded: boolean;
}
