import { Injectable, Logger } from '@nestjs/common';

export enum TripRole {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export interface TripMember {
  userId: string;
  name: string;
  role: TripRole;
}

@Injectable()
export class TripCollaborationService {
  private readonly logger = new Logger(TripCollaborationService.name);
  
  // Mock DB of shared trips
  private groupTrips = new Map<string, TripMember[]>();

  public inviteMember(itineraryId: string, userId: string, role: TripRole = TripRole.VIEWER) {
    this.logger.log(`Inviting user ${userId} to trip ${itineraryId} as ${role}`);
    
    const members = this.groupTrips.get(itineraryId) || [];
    members.push({ userId, name: `User_${userId}`, role });
    
    this.groupTrips.set(itineraryId, members);
    return members;
  }

  public getMembers(itineraryId: string): TripMember[] {
    return this.groupTrips.get(itineraryId) || [];
  }
}
