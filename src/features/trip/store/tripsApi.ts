import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { addTrip, getTripById, getTrips, updateTrip } from '@services/api';

import type { Trip } from '../types';

export const tripsApi = createApi({
  reducerPath: 'tripsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Trips'],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      queryFn: async () => {
        const data = await getTrips();
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Trips' as const, id })),
              { type: 'Trips', id: 'LIST' },
            ]
          : [{ type: 'Trips', id: 'LIST' }],      
    }),
    getTrip: builder.query<Trip, string | undefined>({
      queryFn: async (tripId) => {
        const data = await getTripById(tripId);
        return { data };
      },
      providesTags: (_, __, id) => [{ type: 'Trips', id }],
    }),
    addTrip: builder.mutation<boolean, Trip>({
      queryFn: async (trip) => {
        await addTrip(trip);
        return { data: true };
      },
      invalidatesTags: () => [{ type: 'Trips', id: 'LIST' }],
    }),
    updateTrip: builder.mutation<boolean, { id: string; data: Partial<Trip> }>({
      queryFn: async (data) => {
        await updateTrip(data.id, data.data);
        return { data: true };
      },
      invalidatesTags: (_, __, { id }) => [{ type: 'Trips', id }],    
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
  useAddTripMutation,
  useUpdateTripMutation,
} = tripsApi;