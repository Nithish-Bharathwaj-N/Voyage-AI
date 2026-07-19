import { ApiProperty } from '@nestjs/swagger';

export class PreferencesResponseData {
  @ApiProperty({ example: 'Adventure', nullable: true })
  travelStyle: string | null;

  @ApiProperty({ example: 'Mid-range', nullable: true })
  budgetRange: string | null;

  @ApiProperty({ example: 'Temperate', nullable: true })
  preferredClimate: string | null;

  @ApiProperty({ example: ['Hiking', 'Sightseeing'] })
  favoriteActivities: string[];

  @ApiProperty({ example: 'Train', nullable: true })
  preferredTransport: string | null;

  @ApiProperty({ example: ['Vegetarian'] })
  dietaryPreferences: string[];

  @ApiProperty({ example: ['Wheelchair Access'] })
  accessibilityNeeds: string[];

  @ApiProperty({ example: 'Family', nullable: true })
  travelCompanions: string | null;

  @ApiProperty({ example: 'United States', nullable: true })
  passportCountry: string | null;
}

export class PreferencesResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ type: PreferencesResponseData })
  data: PreferencesResponseData;
}
