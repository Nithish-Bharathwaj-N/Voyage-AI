export const TRAFFIC_PROVIDER = 'TRAFFIC_PROVIDER';

export interface TrafficCondition {
  level: 'LOW' | 'MODERATE' | 'HEAVY' | 'GRIDLOCK';
  delayMinutes: number;
  closures: string[];
}

export interface ITrafficProvider {
  getLiveTraffic(originLat: number, originLng: number, destLat: number, destLng: number): Promise<TrafficCondition>;
}
