import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseData {
  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  id: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  userId: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  avatarUrl: string | null;

  @ApiProperty({ example: 'Avid traveler and photographer.', nullable: true })
  bio: string | null;

  @ApiProperty({ example: 'United States', nullable: true })
  country: string | null;

  @ApiProperty({ example: 'San Francisco', nullable: true })
  city: string | null;

  @ApiProperty({ example: 'en', nullable: true })
  language: string | null;

  @ApiProperty({ example: 'USD', nullable: true })
  currency: string | null;

  @ApiProperty({ example: 'America/Los_Angeles', nullable: true })
  timezone: string | null;

  @ApiProperty({ example: 85 })
  profileCompletion: number;

  @ApiProperty({ example: true })
  isOnboarded: boolean;

  @ApiProperty({ example: '2026-06-26T18:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-26T18:00:00.000Z' })
  updatedAt: Date;
}

export class UserProfileResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: ProfileResponseData })
  data: ProfileResponseData;
}
