export const HOTEL_PROVIDER = 'HOTEL_PROVIDER';

export interface HotelAvailabilityRequest {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export interface HotelRoom {
  roomId: string;
  hotelName: string;
  pricePerNight: number;
  currency: string;
  isAvailable: boolean;
}

export interface IHotelProvider {
  checkAvailability(req: HotelAvailabilityRequest): Promise<HotelRoom[]>;
  bookRoom(roomId: string, userId: string): Promise<boolean>;
}
