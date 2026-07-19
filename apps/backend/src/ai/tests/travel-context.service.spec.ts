import { Test, TestingModule } from '@nestjs/testing';
import { TravelContextService } from '../services/travel-context.service';
import { PLACE_PROVIDER } from '../../integrations/interfaces/place.interface';
import { GEOCODE_PROVIDER } from '../../integrations/interfaces/maps.interface';
import { WEATHER_PROVIDER } from '../../integrations/interfaces/weather.interface';
import { TIMEZONE_PROVIDER } from '../../integrations/interfaces/timezone.interface';
import { COUNTRY_PROVIDER } from '../../integrations/interfaces/country.interface';
import { HOLIDAY_PROVIDER } from '../../integrations/interfaces/holiday.interface';
import { AIRPORT_PROVIDER } from '../../integrations/interfaces/airport.interface';
import { EXCHANGE_RATE_PROVIDER } from '../../integrations/interfaces/exchange.interface';
import { PlanTripDto } from '../dto/plan-trip.dto';

describe('TravelContextService', () => {
  let service: TravelContextService;

  const mockGeocode = {
    geocode: jest.fn().mockResolvedValue([
      {
        latitude: 48.8566,
        longitude: 2.3522,
        countryCode: 'FR',
        formattedAddress: 'Paris, France',
      },
    ]),
  };

  const mockPlace = {
    searchNearby: jest.fn().mockResolvedValue([{ name: 'Eiffel Tower', rating: 4.8 }]),
  };

  const mockWeather = {
    getCurrentWeather: jest
      .fn()
      .mockResolvedValue({ temperatureCelsius: 21.0, conditions: [{ description: 'clear sky' }] }),
  };

  const mockTimezone = {
    getTimezone: jest.fn().mockResolvedValue({ timezoneId: 'Europe/Paris', offsetHours: 2 }),
  };

  const mockCountry = {
    getCountryByCode: jest.fn().mockResolvedValue({
      name: 'France',
      officialName: 'French Republic',
      capital: 'Paris',
      languages: ['French'],
    }),
  };

  const mockExchange = {
    getRates: jest.fn().mockResolvedValue({ rates: { EUR: 0.92 } }),
  };

  const mockHoliday = {
    getHolidays: jest.fn().mockResolvedValue([{ date: '2026-07-14', name: 'Bastille Day' }]),
  };

  const mockAirport = {
    getAirportsByCity: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelContextService,
        { provide: GEOCODE_PROVIDER, useValue: mockGeocode },
        { provide: PLACE_PROVIDER, useValue: mockPlace },
        { provide: WEATHER_PROVIDER, useValue: mockWeather },
        { provide: TIMEZONE_PROVIDER, useValue: mockTimezone },
        { provide: COUNTRY_PROVIDER, useValue: mockCountry },
        { provide: EXCHANGE_RATE_PROVIDER, useValue: mockExchange },
        { provide: HOLIDAY_PROVIDER, useValue: mockHoliday },
        { provide: AIRPORT_PROVIDER, useValue: mockAirport },
      ],
    }).compile();

    service = module.get<TravelContextService>(TravelContextService);
    jest.clearAllMocks();
  });

  it('should compile context summary successfully', async () => {
    const dto: PlanTripDto = {
      destination: 'Paris',
      startDate: '2026-07-10',
      endDate: '2026-07-15',
      budget: 2000,
      currency: 'EUR',
      travelerCount: 2,
    };

    const context = await service.buildContext(dto);
    expect(context).toContain('Paris, France');
    expect(context).toContain('Europe/Paris');
    expect(context).toContain('Eiffel Tower');
    expect(context).toContain('Bastille Day');
  });
});
