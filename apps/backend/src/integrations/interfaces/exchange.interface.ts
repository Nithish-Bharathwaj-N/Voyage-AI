/**
 * Represents exchange rates relative to a base currency.
 */
export interface ExchangeRates {
  base: string;
  timestamp: Date;
  rates: Record<string, number>;
}

/**
 * Contract for all exchange rate provider implementations.
 */
export interface IExchangeRateProvider {
  getRates(baseCurrency: string): Promise<ExchangeRates>;
  convert(amount: number, from: string, to: string): Promise<number>;
  getSupportedCurrencies(): Promise<string[]>;
}

export const EXCHANGE_RATE_PROVIDER = Symbol('IExchangeRateProvider');
