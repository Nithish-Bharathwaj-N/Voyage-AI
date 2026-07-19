import { Injectable, Logger } from '@nestjs/common';
import { SmartNotificationService, NotificationPriority } from './smart-notification.service';

/**
 * TripCompanionService
 * Once a trip starts, this service runs in the background for the user.
 * It tracks location, time, and triggers notifications based on weather, traffic, and schedule.
 */
@Injectable()
export class TripCompanionService {
  private readonly logger = new Logger(TripCompanionService.name);

  constructor(private readonly notifier: SmartNotificationService) {}

  public initializeCompanion(itineraryId: string): any {
    this.logger.log(`Initializing Companion Mode for Itinerary ${itineraryId}`);
    
    // Fire a welcome notification to test the loop
    this.notifier.sendNotification(itineraryId, {
      title: 'Companion Activated',
      message: 'Good morning! I am monitoring the weather and traffic for your trip today.',
      priority: NotificationPriority.HIGH,
      contextData: { type: 'system_alert' }
    });

    return {
      status: 'active',
      itineraryId,
      companionState: 'monitoring_live_events'
    };
  }

  // A cron job or web-socket loop would call this every 5 minutes during the trip
  public async evaluateLiveConditions(itineraryId: string, currentLocation: any): Promise<void> {
    // 1. Check traffic to next activity
    // if (traffic.delayMinutes > 30) this.notifier.send(...)
    
    // 2. Check weather radar
    // if (weather.rainProbability > 80) this.notifier.send(...)
    
    // 3. Activity proximity
    // if (timeToNextActivity < 20 mins) this.notifier.send("Leave hotel now.")
  }
}
