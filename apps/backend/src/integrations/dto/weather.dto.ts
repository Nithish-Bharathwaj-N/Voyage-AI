import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AirQualityDto {
  @IsNumber()
  aqi!: number;

  @IsNumber()
  @IsOptional()
  pm25?: number;

  @IsNumber()
  @IsOptional()
  pm10?: number;
}

export class WeatherAlertDto {
  @IsString()
  event!: string;

  @IsString()
  description!: string;

  @IsDateString()
  start!: string;

  @IsDateString()
  end!: string;
}

export class CurrentWeatherDto {
  @IsNumber()
  temperature!: number;

  @IsNumber()
  feelsLike!: number;

  @IsNumber()
  humidity!: number;

  @IsNumber()
  windSpeed!: number;

  @IsNumber()
  visibility!: number;

  @IsNumber()
  cloudCover!: number;

  @IsNumber()
  uvIndex!: number;

  @IsString()
  condition!: string;

  @IsString()
  icon!: string;

  @IsDateString()
  sunrise!: string;

  @IsDateString()
  sunset!: string;

  @ValidateNested()
  @Type(() => AirQualityDto)
  @IsOptional()
  airQuality?: AirQualityDto;
}

export class HourlyForecastDto {
  @IsDateString()
  timestamp!: string;

  @IsNumber()
  temperature!: number;

  @IsNumber()
  rainProbability!: number;

  @IsString()
  condition!: string;

  @IsString()
  icon!: string;
}

export class DailyForecastDto {
  @IsDateString()
  date!: string;

  @IsNumber()
  minTemp!: number;

  @IsNumber()
  maxTemp!: number;

  @IsNumber()
  rainProbability!: number;

  @IsString()
  condition!: string;

  @IsString()
  icon!: string;

  @IsString()
  @IsOptional()
  moonPhase?: string;

  @IsDateString()
  @IsOptional()
  goldenHour?: string;

  @IsDateString()
  @IsOptional()
  blueHour?: string;
}

export class WeatherIntelligenceDto {
  @ValidateNested()
  @Type(() => CurrentWeatherDto)
  current!: CurrentWeatherDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HourlyForecastDto)
  hourly!: HourlyForecastDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyForecastDto)
  daily!: DailyForecastDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeatherAlertDto)
  @IsOptional()
  alerts?: WeatherAlertDto[];
}
