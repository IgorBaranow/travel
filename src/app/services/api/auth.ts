import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@services/firebase";

export function register(name: string, email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
