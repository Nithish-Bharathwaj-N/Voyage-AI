import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip, Reservation, TripStatus } from './types';
import { useUserStore } from './useUserStore';

interface TripState {
  trips: Trip[];
  reservations: Reservation[];
  
  // Trip Actions
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  duplicateTrip: (id: string) => void;
  
  // Reservation Actions
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  
  // Getters
  getTripsByStatus: (status: TripStatus) => Trip[];
  getReservationsForTrip: (tripId: string) => Reservation[];
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [],
      reservations: [],

      addTrip: (trip) => {
        set((state) => ({ trips: [...state.trips, trip] }));
        useUserStore.getState().logHistory({
          id: `hist_${Date.now()}`, action: 'created', entityType: 'trip', 
          entityId: trip.id, entityName: trip.title, timestamp: new Date().toISOString()
        });
      },

      updateTrip: (id, updates) => set((state) => ({
        trips: state.trips.map(t => t.id === id ? { ...t, ...updates, lastEdited: new Date().toISOString() } : t)
      })),

      deleteTrip: (id) => set((state) => ({
        trips: state.trips.filter(t => t.id !== id),
        reservations: state.reservations.filter(r => r.tripId !== id)
      })),

      duplicateTrip: (id) => {
        const tripToDup = get().trips.find(t => t.id === id);
        if (tripToDup) {
          const newId = `trip_${Date.now()}`;
          const duplicated: Trip = { ...tripToDup, id: newId, title: `${tripToDup.title} (Copy)`, lastEdited: new Date().toISOString() };
          set((state) => ({ trips: [...state.trips, duplicated] }));
          useUserStore.getState().logHistory({
            id: `hist_${Date.now()}`, action: 'created', entityType: 'trip', 
            entityId: newId, entityName: duplicated.title, timestamp: new Date().toISOString()
          });
        }
      },

      addReservation: (reservation) => {
        set((state) => ({ reservations: [...state.reservations, reservation] }));
        useUserStore.getState().logHistory({
          id: `hist_${Date.now()}`, action: 'created', entityType: 'reservation', 
          entityId: reservation.id, entityName: reservation.title, timestamp: new Date().toISOString()
        });
      },

      updateReservation: (id, updates) => set((state) => ({
        reservations: state.reservations.map(r => r.id === id ? { ...r, ...updates } : r)
      })),

      deleteReservation: (id) => set((state) => ({
        reservations: state.reservations.filter(r => r.id !== id)
      })),

      getTripsByStatus: (status) => get().trips.filter(t => t.status === status),
      getReservationsForTrip: (tripId) => get().reservations.filter(r => r.tripId === tripId),
    }),
    {
      name: 'voyage-trip-storage',
    }
  )
);
