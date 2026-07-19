import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Itinerary, ActivityItem } from '../interfaces/itinerary.interface';
import { PlannerContext } from '../dto/planner-context.dto';
import {
  IMAGE_PROVIDER,
  IImagesProvider,
  ImageResult,
} from '../../integrations/interfaces/images.interface';
import {
  PlaceResult,
  IPlaceProvider,
  PLACE_PROVIDER,
} from '../../integrations/interfaces/place.interface';

/**
 * ItineraryEnricher (Phase 3 upgrade)
 *
 * Phase 2: Fetched Unsplash images per activity.
 * Phase 3: Also matches each activity to a real PlaceResult from context,
 *          copying rating, reviewCount (estimated), priceLevel, placeId.
 *          Generates googleMapsUrl from coordinates.
 *          All enrichment runs in parallel via Promise.allSettled().
 *
 * Never throws — partial failures produce null fields gracefully.
 */
@Injectable()
export class ItineraryEnricher {
  private readonly logger = new Logger(ItineraryEnricher.name);

  constructor(
    @Inject(IMAGE_PROVIDER) private readonly imagesProvider: IImagesProvider,
    @Inject(PLACE_PROVIDER) private readonly placeProvider: IPlaceProvider,
    private readonly configService: ConfigService,
  ) {}

  async enrich(itinerary: Itinerary, context: PlannerContext): Promise<Itinerary> {
    const startMs = Date.now();

    // ── Attach destination-level metadata ──
    if (context.destinationImage) {
      itinerary.heroImage = context.destinationImage.url;
      itinerary.heroAttribution = `Photo by ${context.destinationImage.photographerName} on Unsplash`;
    }
    if (context.geocode) {
      itinerary.coordinates = {
        latitude: context.geocode.latitude,
        longitude: context.geocode.longitude,
      };
    }
    if (context.country) itinerary.country = context.country.name;
    if (context.timezone) itinerary.timezone = context.timezone.timezoneId;

    // ── Collect all activities ──
    const allActivities: { dayIdx: number; actIdx: number; activity: ActivityItem }[] = [];
    itinerary.days.forEach((day, dayIdx) => {
      if (Array.isArray(day.activities)) {
        day.activities.forEach((activity, actIdx) => {
          allActivities.push({ dayIdx, actIdx, activity });
        });
      }
    });

    if (allActivities.length === 0) return itinerary;

    // ── Build all enrichment queries ──
    const imageQueries = allActivities.map(({ activity }) =>
      activity.imageQuery ? activity.imageQuery : `${activity.location} ${activity.activity}`,
    );

    this.logger.debug(
      `[Enricher] Enriching ${allActivities.length} activities in parallel (images + place match)`,
    );

    // ── Fire all image lookups in parallel ──
    const imageResults = await Promise.allSettled(
      imageQueries.map((query) =>
        this.imagesProvider.searchImages({ query, perPage: 1, orientation: 'landscape' }),
      ),
    );

    // ── All real places from context for matching ──
    const allPlaces = context.places; // Already merged: attractions + restaurants + museums

    // ── Attach enrichment to each activity ──
    let imageSuccessCount = 0;
    let placeMatchCount = 0;

    // First pass: match places
    const matchedPlaces = allActivities.map(({ activity }) =>
      this.findBestPlaceMatch(activity.location, allPlaces),
    );

    // Second pass: fetch deep place details concurrently
    const placeDetailsResults = await Promise.allSettled(
      matchedPlaces.map((match) =>
        match ? this.placeProvider.getPlaceDetails(match.placeId) : Promise.resolve(null),
      ),
    );

    // Third pass: apply all data
    allActivities.forEach(({ activity }, idx) => {
      const imageResult = imageResults[idx];
      const detailsResult = placeDetailsResults[idx];

      let finalImageUrl: string | undefined = undefined;
      let finalImageAttribution: string | undefined = undefined;

      // Match Place Details
      if (detailsResult.status === 'fulfilled' && detailsResult.value) {
        const p = detailsResult.value;
        activity.rating = p.rating;
        activity.reviewCount = p.reviewCount;
        activity.priceLevel = p.priceLevel;
        activity.placeId = p.placeId;
        activity.website = p.website;
        activity.openingHours = p.openingHours ? p.openingHours.join(', ') : undefined;
        activity.googleMapsUrl = p.url;

        // Image Waterfall 1: Google Places Photo
        if (p.photoReference) {
          finalImageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${p.photoReference}&key=${this.configService.get('integrations.googlePlacesApiKey') || ''}`;
          finalImageAttribution = 'Google Places';
        }

        placeMatchCount++;
      }

      // Image Waterfall 2: Unsplash fallback
      if (!finalImageUrl && imageResult.status === 'fulfilled' && imageResult.value.length > 0) {
        const img: ImageResult = imageResult.value[0];
        finalImageUrl = img.url;
        finalImageAttribution = `Photo by ${img.photographerName} on Unsplash`;
        imageSuccessCount++;
      } else if (imageResult.status === 'rejected') {
        this.logger.warn(`Image failed for "${activity.activity}": ${imageResult.reason}`);
      }

      // Image Waterfall 3: Absolute fallback
      if (!finalImageUrl) {
        finalImageUrl = '/images/hero-bg.png';
        finalImageAttribution = 'VoyageAI Default';
      }

      activity.image = finalImageUrl;
      activity.imageAttribution = finalImageAttribution;

      // Fallback Google Maps URL generation if details didn't have one
      if (
        !activity.googleMapsUrl &&
        activity.coordinates?.latitude &&
        activity.coordinates?.longitude
      ) {
        const lat = activity.coordinates.latitude;
        const lng = activity.coordinates.longitude;
        const placeName = encodeURIComponent(activity.location);
        activity.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${placeName}&query_place_id=${activity.placeId ?? ''}&center=${lat},${lng}`;
      }
    });

    // ── Calculate per-day walking distances (approximate) ──
    itinerary.days.forEach((day) => {
      if (!day.totalWalkingKm && day.activities.length > 1) {
        let totalKm = 0;
        for (let i = 0; i < day.activities.length - 1; i++) {
          const a = day.activities[i];
          const b = day.activities[i + 1];
          if (a.coordinates && b.coordinates) {
            totalKm += this.haversineKm(
              a.coordinates.latitude,
              a.coordinates.longitude,
              b.coordinates.latitude,
              b.coordinates.longitude,
            );
          }
        }
        if (totalKm > 0) {
          day.totalWalkingKm = Math.round(totalKm * 10) / 10;
        }
      }
    });

    const latencyMs = Date.now() - startMs;
    this.logger.log(
      `[Enricher] Done in ${latencyMs}ms | Images: ${imageSuccessCount}/${allActivities.length} | Place matches: ${placeMatchCount}/${allActivities.length}`,
    );

    return itinerary;
  }

  /**
   * Finds the best matching PlaceResult for an activity location name.
   * Uses normalized string inclusion matching — fast, no external calls.
   */
  private findBestPlaceMatch(locationName: string, places: PlaceResult[]): PlaceResult | null {
    if (!locationName || places.length === 0) return null;

    const normalized = locationName.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const words = normalized.split(/\s+/).filter((w) => w.length > 3);

    let bestMatch: PlaceResult | null = null;
    let bestScore = 0;

    for (const place of places) {
      const placeName = place.name.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      let score = 0;

      // Exact match
      if (placeName === normalized) {
        score = 100;
      } else if (placeName.includes(normalized) || normalized.includes(placeName)) {
        score = 80;
      } else {
        // Word overlap scoring
        for (const word of words) {
          if (placeName.includes(word)) score += 15;
        }
      }

      if (score > bestScore && score >= 15) {
        bestScore = score;
        bestMatch = place;
      }
    }

    return bestMatch;
  }

  /**
   * Haversine formula — approximate distance in kilometres between two coordinates.
   */
  private haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
