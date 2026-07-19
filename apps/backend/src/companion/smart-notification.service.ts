import { Injectable, Logger } from '@nestjs/common';

export enum NotificationPriority {
  LOW = 'LOW',       // e.g. "Try the local coffee here"
  MEDIUM = 'MEDIUM', // e.g. "Leave hotel in 15 mins"
  HIGH = 'HIGH',     // e.g. "Traffic gridlock, alternate route found"
  URGENT = 'URGENT'  // e.g. "Flight gate changed to B12"
}

export interface SmartNotification {
  title: string;
  message: string;
  priority: NotificationPriority;
  contextData?: any;
}

/**
 * SmartNotificationService
 * Pushes alerts to the user device without spamming.
 */
@Injectable()
export class SmartNotificationService {
  private readonly logger = new Logger(SmartNotificationService.name);
  private recentAlerts = new Map<string, number>();

  public sendNotification(userIdOrItinerary: string, alert: SmartNotification): boolean {
    // Basic anti-spam: don't send exact same message within 1 hour
    const hash = `${userIdOrItinerary}_${alert.title}`;
    const lastSent = this.recentAlerts.get(hash) || 0;
    
    if (Date.now() - lastSent < 3600000 && alert.priority !== NotificationPriority.URGENT) {
      this.logger.debug(`Silencing duplicate alert: ${alert.title}`);
      return false; 
    }

    this.logger.log(`[PUSH NOTIFICATION] [${alert.priority}] ${alert.title}: ${alert.message}`);
    this.recentAlerts.set(hash, Date.now());
    
    // In production, this integrates with Firebase Cloud Messaging (FCM) or APNS
    return true;
  }
}
