import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CollaboratorRole, InvitationStatus } from '@prisma/client';

export class SendInvitationDto {
  @ApiProperty({ example: 'collaborator@example.com' })
  @IsEmail()
  @IsNotEmpty()
  inviteeEmail: string;

  @ApiProperty({ enum: CollaboratorRole, example: CollaboratorRole.EDITOR })
  @IsEnum(CollaboratorRole)
  @IsNotEmpty()
  role: CollaboratorRole;
}

export class InvitationResponseData {
  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  id: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  tripId: string;

  @ApiProperty({ example: 'd3b07384-d113-4956-a320-13e2f5e3f402' })
  inviterId: string;

  @ApiProperty({ example: 'collaborator@example.com' })
  inviteeEmail: string;

  @ApiProperty({ enum: CollaboratorRole, example: CollaboratorRole.EDITOR })
  role: CollaboratorRole;

  @ApiProperty({ enum: InvitationStatus, example: InvitationStatus.PENDING })
  status: InvitationStatus;

  @ApiProperty({ example: 'abc123xyz_secret_token' })
  token: string;

  @ApiProperty({ example: '2026-07-04T10:00:00.000Z' })
  expiresAt: Date;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-27T10:00:00.000Z' })
  updatedAt: Date;
}

export class InvitationResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Invitation sent successfully' })
  message: string;

  @ApiProperty({ type: InvitationResponseData })
  data: InvitationResponseData;
}
