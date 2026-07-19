import {
  RouteDto,
  WaypointDto,
  DistanceMatrixDto,
  MapBoundsDto,
  GeocodeDto,
  ReverseGeocodeDto,
  TravelTimeDto,
  TransportMode,
} from '../dto/maps.dto';

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface GeocodeResult {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  country?: string;
  countryCode?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  placeId?: string;
}

export interface IGeocodeProvider {
  geocode(address: string): Promise<GeocodeDto[]>;
  reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeDto>;
}

export interface IRoutingProvider {
  calculateRoute(
    origin: WaypointDto,
    destination: WaypointDto,
    mode: TransportMode,
  ): Promise<RouteDto>;
  calculateMultiStopRoute(waypoints: WaypointDto[], mode: TransportMode): Promise<RouteDto>;
  calculateWalkingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto>;
  calculateDrivingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto>;
  calculateTransitRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto>;
  calculateCyclingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto>;
  optimizeWaypointOrder(waypoints: WaypointDto[]): Promise<WaypointDto[]>;
}

export interface IDistanceMatrixProvider {
  calculateDistanceMatrix(
    origins: WaypointDto[],
    destinations: WaypointDto[],
    mode: TransportMode,
  ): Promise<DistanceMatrixDto>;
  estimateArrivalTimes(
    origin: WaypointDto,
    destinations: WaypointDto[],
    mode: TransportMode,
    departureTime: Date,
  ): Promise<Date[]>;
  calculateTravelTime(
    origin: WaypointDto,
    destination: WaypointDto,
    mode: TransportMode,
  ): Promise<TravelTimeDto>;
}

export interface IStaticMapProvider {
  generateStaticMap(center: GeoCoordinate, zoom: number, width: number, height: number): string;
  generateStaticMapWithRoute(routePolyline: string, width: number, height: number): string;
  generateStaticMapWithMarkers(markers: GeoCoordinate[], width: number, height: number): string;
}

export interface IMapProvider {
  fitMapBounds(coordinates: GeoCoordinate[]): MapBoundsDto;
  clusterMarkers(coordinates: GeoCoordinate[], radius: number): GeoCoordinate[][];
}

export interface IMapsIntelligenceProvider {
  recommendTransportMode(distanceMeters: number): TransportMode;
  estimateTravelEfficiency(route: RouteDto): string;
  calculateWalkingLoad(route: RouteDto): string;
  detectRouteConflicts(routes: RouteDto[]): string[];
  findNearbyAlternatives(location: GeoCoordinate): Promise<GeoCoordinate[]>;
  estimateCarbonEmission(route: RouteDto): number;
}

export const GEOCODE_PROVIDER = Symbol('IGeocodeProvider');
export const ROUTING_PROVIDER = Symbol('IRoutingProvider');
export const DISTANCE_MATRIX_PROVIDER = Symbol('IDistanceMatrixProvider');
export const STATIC_MAP_PROVIDER = Symbol('IStaticMapProvider');
export const MAP_PROVIDER = Symbol('IMapProvider');
export const MAPS_INTELLIGENCE_PROVIDER = Symbol('IMapsIntelligenceProvider');
