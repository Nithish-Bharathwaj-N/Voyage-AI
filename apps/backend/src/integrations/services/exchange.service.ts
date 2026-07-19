import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IExchangeRateProvider, ExchangeRates } from '../interfaces/exchange.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'ExchangeService';
const OER_BASE = 'https://openexchangerates.org/api';
const RATES_TTL = 3600; // 1 hour — exchange rates update hourly on free plan

interface OERLatestResponse {
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

interface OERCurrenciesResponse {
  [code: string]: string;
}

/**
 * Exchange rate provider backed by Open Exchange Rates API.
 * Requires OPEN_EXCHANGE_RATES_APP_ID in environment.
 * Degrades gracefully if key is absent.
 */
@Injectable()
export class ExchangeService implements IExchangeRateProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly appId: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.appId = this.configService.get<string>('integrations.openExchangeRatesAppId');
    if (!this.appId) {
      this.logger.warn(
        'OPEN_EXCHANGE_RATES_APP_ID not configured — ExchangeService will be unavailable',
      );
    }
  }

  async getRates(baseCurrency: string = 'USD'): Promise<ExchangeRates> {
    this.assertApiKey();

    const cacheKey = CacheService.buildKey('exchange', 'rates', baseCurrency);
    const cached = await this.cacheService.get<ExchangeRates>(cacheKey);
    if (cached) return cached;

    // Free plan only supports USD as base; convert client-side if needed
    const url = `${OER_BASE}/latest.json?app_id=${this.appId}&base=USD`;
    const response = await this.httpService.get<OERLatestResponse>(PROVIDER, url);

    let rates = response.data.rates;
    let base = 'USD';

    if (baseCurrency !== 'USD' && rates[baseCurrency]) {
      const factor = rates[baseCurrency];
      rates = Object.fromEntries(
        Object.entries(rates).map(([code, rate]) => [code, rate / factor]),
      );
      rates['USD'] = 1 / factor;
      base = baseCurrency;
    }

    const result: ExchangeRates = {
      base,
      timestamp: new Date(response.data.timestamp * 1000),
      rates,
    };

    await this.cacheService.set(cacheKey, result, RATES_TTL);
    return result;
  }

  async convert(amount: number, from: string, to: string): Promise<number> {
    const { rates } = await this.getRates('USD');
    const fromRate = from === 'USD' ? 1 : rates[from];
    const toRate = to === 'USD' ? 1 : rates[to];
    if (!fromRate || !toRate) {
      throw new ProviderUnavailableException(
        PROVIDER,
        `Unknown currency: ${!fromRate ? from : to}`,
      );
    }
    return (amount / fromRate) * toRate;
  }

  async getSupportedCurrencies(): Promise<string[]> {
    this.assertApiKey();

    const cacheKey = CacheService.buildKey('exchange', 'currencies');
    const cached = await this.cacheService.get<string[]>(cacheKey);
    if (cached) return cached;

    const url = `${OER_BASE}/currencies.json?app_id=${this.appId}`;
    const response = await this.httpService.get<OERCurrenciesResponse>(PROVIDER, url);

    const codes = Object.keys(response.data);
    await this.cacheService.set(cacheKey, codes, 86400); // 24h
    return codes;
  }

  private assertApiKey(): void {
    if (!this.appId) {
      throw new ProviderUnavailableException(
        PROVIDER,
        'OPEN_EXCHANGE_RATES_APP_ID is not configured',
      );
    }
  }
}
