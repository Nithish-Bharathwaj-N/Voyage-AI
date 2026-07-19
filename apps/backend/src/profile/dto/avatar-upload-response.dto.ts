import { ApiProperty } from '@nestjs/swagger';

export class AvatarUploadResponseData {
  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatarUrl: string;
}

export class AvatarUploadResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Avatar uploaded successfully' })
  message: string;

  @ApiProperty({ type: AvatarUploadResponseData })
  data: AvatarUploadResponseData;
}
