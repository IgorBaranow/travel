import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import type { Trip } from "@features/trip/types";
import { auth, firestore } from "@services/firebase";

export async function getTrips() {
  if (!auth.currentUser) {
    throw Error('Looks like you are not-authorized to make this change!');
  }

  const userTripsQuery = query(
    collection(firestore, 'trips'),
    where('userUid', '==', auth.currentUser.uid),
  );

  const querySnapshot = await getDocs(userTripsQuery);

  return querySnapshot.docs.map((doc) => doc.data() as Trip);
}

export async function getTripById(tripId?: string) {
  if (!auth.currentUser) {
    throw Error('Looks like you are not-authorized to make this change!');
  }

  if (!tripId) {
    throw new Error('Trip not found!');
  }

  const tripRef = doc(firestore, 'trips', tripId);
  const tripSnap = await getDoc(tripRef);

  if (!tripSnap.exists()) {
    throw new Error('Trip not found!');
  }

  return tripSnap.data() as Trip;
}

export async function addTrip(trip: Trip) {
  if (!auth.currentUser) {
    throw Error("Looks like you are not-authorized to make this change!");
  }

  await setDoc(doc(firestore, "trips", trip.id), {
    ...trip,
    userUid: auth.currentUser.uid,
  });
}
