import apiClient, { ApiResponse } from './apiClient';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timestamp: string;
  temperatureCelsius: number;
  feelsLikeCelsius: number;
  humidity: number;
  windSpeedKmh: number;
  windDirection?: number;
  conditions: WeatherCondition[];
  visibility?: number;
  cityName?: string;
  countryCode?: string;
}

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: WeatherData[];
}

export const weatherService = {
  getCurrentWeather: async (lat: number, lng: number): Promise<ApiResponse<WeatherData>> => {
    return apiClient.get(`/weather/current?lat=${lat}&lng=${lng}`);
  },

  getForecast: async (lat: number, lng: number, days?: number): Promise<ApiResponse<WeatherForecast>> => {
    const url = days ? `/weather/forecast?lat=${lat}&lng=${lng}&days=${days}` : `/weather/forecast?lat=${lat}&lng=${lng}`;
    return apiClient.get(url);
  },
};
