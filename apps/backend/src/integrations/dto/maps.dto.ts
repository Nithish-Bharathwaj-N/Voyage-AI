import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum TransportMode {
  WALKING = 'WALKING',
  DRIVING = 'DRIVING',
  CYCLING = 'CYCLING',
  TRANSIT = 'TRANSIT',
}

export class WaypointDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  placeId?: string;
}

export class RouteStepDto {
  @IsString()
  instruction!: string;

  @IsNumber()
  distanceMeters!: number;

  @IsNumber()
  durationSeconds!: number;

  @IsString()
  @IsOptional()
  maneuver?: string;

  @ValidateNested()
  @Type(() => WaypointDto)
  location!: WaypointDto;
}

export class RouteLegDto {
  @IsNumber()
  distanceMeters!: number;

  @IsNumber()
  durationSeconds!: number;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RouteStepDto)
  steps!: RouteStepDto[];
}

export class RouteDto {
  @ValidateNested()
  @Type(() => WaypointDto)
  origin!: WaypointDto;

  @ValidateNested()
  @Type(() => WaypointDto)
  destination!: WaypointDto;

  @IsEnum(TransportMode)
  mode!: TransportMode;

  @IsNumber()
  totalDistanceMeters!: number;

  @IsNumber()
  totalDurationSeconds!: number;

  @IsString()
  geometryPolyline!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RouteLegDto)
  legs!: RouteLegDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WaypointDto)
  @IsOptional()
  waypoints?: WaypointDto[];
}

export class DistanceMatrixElementDto {
  @IsNumber()
  distanceMeters!: number;

  @IsNumber()
  durationSeconds!: number;

  @IsString()
  status!: string;
}

export class DistanceMatrixDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WaypointDto)
  origins!: WaypointDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WaypointDto)
  destinations!: WaypointDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DistanceMatrixElementDto)
  rows!: DistanceMatrixElementDto[][];
}

export class MapBoundsDto {
  @IsNumber()
  north!: number;

  @IsNumber()
  south!: number;

  @IsNumber()
  east!: number;

  @IsNumber()
  west!: number;
}

export class GeocodeDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  formattedAddress!: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsString()
  @IsOptional()
  placeId?: string;
}

export class ReverseGeocodeDto extends GeocodeDto {}

export class TravelTimeDto {
  @IsNumber()
  durationSeconds!: number;

  @IsEnum(TransportMode)
  mode!: TransportMode;
}

export class MapsIntelligenceDto {
  @ValidateNested()
  @Type(() => RouteDto)
  @IsOptional()
  route?: RouteDto;

  @ValidateNested()
  @Type(() => DistanceMatrixDto)
  @IsOptional()
  matrix?: DistanceMatrixDto;
}
