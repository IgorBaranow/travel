import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { Trip } from '@features/trip/types';
import { auth, firestore, getDownloadURL } from '@services/firebase';

function authenticate<T>(authenticatedFn: () => Promise<T>) {
  if (!auth.currentUser) {
    throw Error('Looks like you are not-authorized to make this change!');
  }

  return authenticatedFn();
}

export async function getTrips() {
  return authenticate(async () => {
    const userTripsQuery = query(
      collection(firestore, 'trips'),
      where('userUid', '==', auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(userTripsQuery);

    const fetchedTrips = querySnapshot.docs.map((doc) => doc.data() as Trip);

    const tripsPromises = await Promise.allSettled(
      fetchedTrips.map(async (trip) => {
        if (trip.previewImage?.storagePath) {
          trip.previewImage.url = await getDownloadURL(
            trip.previewImage?.storagePath,
          );
        }

        return trip;
      }),
    );

    const tripsWithPreviewImages = tripsPromises
      .map((trip) => {
        if (trip.status === 'fulfilled') {
          return trip.value;
        } else {
          return null;
        }
      })
      .filter(Boolean);

    return tripsWithPreviewImages as Trip[];
  });
}

export async function getTripById(tripId?: string) {
  return authenticate(async () => {
    if (!tripId) {
      throw new Error('Trip not found!');
    }

    const tripRef = doc(firestore, 'trips', tripId);
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
      throw new Error('Trip not found!');
    }

    const trip = tripSnap.data() as Trip;

    if (trip.previewImage?.storagePath) {
      trip.previewImage.url = await getDownloadURL(
        trip.previewImage?.storagePath,
      );
    }

    return trip;
  });
}

export async function addTrip(trip: Trip) {
  return authenticate(async () => {
    await setDoc(doc(firestore, 'trips', trip.id), {
      ...trip,
      userUid: auth.currentUser!.uid,
    });
  });
}

export async function updateTrip(tripId: string, data: Partial<Trip>) {
  return authenticate(async () => {
    const tripRef = doc(firestore, 'trips', tripId);
    await updateDoc(tripRef, data);

    return true;
  });
}

export async function deleteTrip(tripId: string) {
  return authenticate(async () => {
    const tripRef = doc(firestore, 'trips', tripId);
    await deleteDoc(tripRef);

    return true;
  });
}