import { ItineraryValidatorService } from '../services/itinerary-validator.service';
import { Itinerary } from '../interfaces/itinerary.interface';

/** Helper that builds a day with real place names, real coordinates, and ≥4 activities */
function buildRealDay(
  dayNumber: number,
  date: string,
  activityCount: number = 5,
): {
  dayNumber: number;
  date: string;
  activities: {
    time: string;
    location: string;
    activity: string;
    durationMinutes: number;
    estimatedCost: number;
    currency: string;
    coordinates: { latitude: number; longitude: number };
  }[];
} {
  const activities = [
    {
      time: '08:00',
      location: 'Tower of London',
      activity: 'Explore the Tower of London medieval fortress',
      durationMinutes: 120,
      estimatedCost: 30,
      currency: 'USD',
      coordinates: { latitude: 51.5081, longitude: -0.0759 },
    },
    {
      time: '11:00',
      location: 'Borough Market',
      activity: 'Sample artisan produce at Borough Market',
      durationMinutes: 60,
      estimatedCost: 20,
      currency: 'USD',
      coordinates: { latitude: 51.5055, longitude: -0.0909 },
    },
    {
      time: '13:00',
      location: 'Tate Modern Gallery',
      activity: 'Contemporary art tour at Tate Modern',
      durationMinutes: 90,
      estimatedCost: 0,
      currency: 'USD',
      coordinates: { latitude: 51.5076, longitude: -0.0994 },
    },
    {
      time: '15:30',
      location: "St Paul's Cathedral",
      activity: "Walk the golden gallery of St Paul's Cathedral",
      durationMinutes: 75,
      estimatedCost: 20,
      currency: 'USD',
      coordinates: { latitude: 51.5138, longitude: -0.0984 },
    },
    {
      time: '19:00',
      location: 'Dishoom Shoreditch',
      activity: 'Dinner at Dishoom — iconic Bombay-style café',
      durationMinutes: 90,
      estimatedCost: 45,
      currency: 'USD',
      coordinates: { latitude: 51.5226, longitude: -0.0784 },
    },
  ].slice(0, activityCount);

  return { dayNumber, date, activities };
}

describe('ItineraryValidatorService', () => {
  let service: ItineraryValidatorService;

  beforeEach(() => {
    const mockRouteOptimizer = { validateRouteEfficiency: jest.fn().mockReturnValue(true) } as any;
    service = new ItineraryValidatorService(mockRouteOptimizer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should pass on a fully valid itinerary with real places and coordinates', () => {
      const valid: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 1000,
        currency: 'USD',
        totalEstimatedCost: 115,
        days: [buildRealDay(1, '2026-07-10')],
      };

      const errors = service.validate(valid);
      expect(errors).toHaveLength(0);
    });

    it('should detect duplicate activities and time overlaps', () => {
      const invalid: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 1000,
        currency: 'USD',
        totalEstimatedCost: 200,
        days: [
          {
            dayNumber: 1,
            date: '2026-07-10',
            activities: [
              {
                time: '09:00',
                location: 'Tower of London',
                activity: 'Tower Tour',
                durationMinutes: 120,
                estimatedCost: 30,
                currency: 'USD',
                coordinates: { latitude: 51.5081, longitude: -0.0759 },
              },
              {
                time: '10:00', // Overlaps!
                location: 'Borough Market',
                activity: 'Tower Tour', // Duplicate!
                durationMinutes: 60,
                estimatedCost: 35,
                currency: 'USD',
                coordinates: { latitude: 51.5055, longitude: -0.0909 },
              },
              {
                time: '12:00',
                location: 'Tate Modern',
                activity: 'Art Visit at Tate Modern Gallery',
                durationMinutes: 90,
                estimatedCost: 0,
                currency: 'USD',
                coordinates: { latitude: 51.5076, longitude: -0.0994 },
              },
              {
                time: '15:00',
                location: "St Paul's Cathedral",
                activity: "St Paul's Cathedral Walk",
                durationMinutes: 75,
                estimatedCost: 20,
                currency: 'USD',
                coordinates: { latitude: 51.5138, longitude: -0.0984 },
              },
            ],
          },
        ],
      };

      const errors = service.validate(invalid);
      expect(errors.some((e) => e.type === 'time_conflict')).toBe(true);
      expect(errors.some((e) => e.type === 'duplicate_activity')).toBe(true);
    });

    it('should detect budget overflow (> 10% threshold)', () => {
      const overflow: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 50,
        currency: 'USD',
        totalEstimatedCost: 300,
        days: [buildRealDay(1, '2026-07-10')],
      };

      const errors = service.validate(overflow);
      expect(errors.some((e) => e.type === 'budget_overflow')).toBe(true);
    });

    it('should detect placeholder activities (Phase 3)', () => {
      const withPlaceholders: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 1000,
        currency: 'USD',
        totalEstimatedCost: 100,
        days: [
          {
            dayNumber: 1,
            date: '2026-07-10',
            activities: [
              {
                time: '09:00',
                location: 'Heathrow Airport',
                activity: 'Arrival and airport transfer',
                durationMinutes: 60,
                estimatedCost: 50,
                currency: 'USD',
                coordinates: { latitude: 51.477, longitude: -0.461 },
              },
              {
                time: '11:00',
                location: 'Hotel',
                activity: 'Check in to hotel',
                durationMinutes: 30,
                estimatedCost: 0,
                currency: 'USD',
                coordinates: { latitude: 51.5, longitude: -0.12 },
              },
              {
                time: '14:00',
                location: 'Tower of London',
                activity: 'Tower of London Fortress Visit',
                durationMinutes: 120,
                estimatedCost: 30,
                currency: 'USD',
                coordinates: { latitude: 51.5081, longitude: -0.0759 },
              },
              {
                time: '17:00',
                location: 'Free Afternoon',
                activity: 'Free time to explore the city',
                durationMinutes: 120,
                estimatedCost: 0,
                currency: 'USD',
                coordinates: { latitude: 51.5, longitude: -0.12 },
              },
            ],
          },
        ],
      };

      const errors = service.validate(withPlaceholders);
      expect(errors.some((e) => e.type === 'placeholder_detected')).toBe(true);
    });

    it('should detect missing coordinates (Phase 3)', () => {
      const missingCoords: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 1000,
        currency: 'USD',
        totalEstimatedCost: 50,
        days: [
          {
            dayNumber: 1,
            date: '2026-07-10',
            activities: [
              {
                time: '09:00',
                location: 'Tower of London',
                activity: 'Tower of London Fortress Visit',
                durationMinutes: 90,
                estimatedCost: 30,
                currency: 'USD',
                coordinates: { latitude: 0, longitude: 0 }, // Zero coordinates!
              },
              {
                time: '12:00',
                location: 'Borough Market',
                activity: 'Borough Market artisan food sampling',
                durationMinutes: 60,
                estimatedCost: 20,
                currency: 'USD',
                // No coordinates at all!
              },
              {
                time: '14:00',
                location: 'Tate Modern',
                activity: 'Contemporary art at Tate Modern Gallery',
                durationMinutes: 90,
                estimatedCost: 0,
                currency: 'USD',
                coordinates: { latitude: 51.5076, longitude: -0.0994 },
              },
              {
                time: '17:00',
                location: "St Paul's Cathedral",
                activity: "St Paul's Cathedral Golden Gallery Walk",
                durationMinutes: 75,
                estimatedCost: 20,
                currency: 'USD',
                coordinates: { latitude: 51.5138, longitude: -0.0984 },
              },
            ],
          },
        ],
      };

      const errors = service.validate(missingCoords);
      expect(errors.some((e) => e.type === 'missing_coordinates')).toBe(true);
    });

    it('should detect insufficient activities per day (Phase 3)', () => {
      const tooFew: Itinerary = {
        destination: 'London',
        startDate: '2026-07-10',
        endDate: '2026-07-11',
        budgetLimit: 1000,
        currency: 'USD',
        totalEstimatedCost: 30,
        days: [buildRealDay(1, '2026-07-10', 2)], // Only 2 activities
      };

      const errors = service.validate(tooFew);
      expect(errors.some((e) => e.type === 'insufficient_activities')).toBe(true);
    });

    it('should return empty errors array for null itinerary input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = service.validate(null as any);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].type).toBe('schema');
    });
  });
});
