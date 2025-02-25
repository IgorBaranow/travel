import {
  getDownloadURL as firebaseGetDownloadURL,
  ref,
} from "firebase/storage";

import { storage } from "../firebase";

export async function getDownloadURL(storagePath?: string | null) {
  if (!storagePath) {
    return null;
  }

  const fileRef = ref(storage, storagePath);
  const url = await firebaseGetDownloadURL(fileRef);

  return url;
}
