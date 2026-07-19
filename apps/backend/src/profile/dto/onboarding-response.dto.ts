import { ApiProperty } from '@nestjs/swagger';

export class OnboardingResponseData {
  @ApiProperty({ example: true })
  isOnboarded: boolean;

  @ApiProperty({ example: 85 })
  profileCompletion: number;
}

export class OnboardingResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: OnboardingResponseData })
  data: OnboardingResponseData;
}
