import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, mapAuthCodeToMessage } from "@services/firebase";

export async function register(name: string, email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    } else {
      throw Error("Something went wrong! Please try again!");
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw Error(mapAuthCodeToMessage(error.code));
    }
    throw Error("Something went wrong! Please try again!");
  }
}
export function login(email: string, password: string) {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw Error(mapAuthCodeToMessage(error.code));
    }
    throw Error("Something went wrong! Please try again!");
  }
}
