import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

import { selectUser } from "@features/auth/store/authSlice";
import { DocumentToUpload, TripFile } from "@features/trip/types";
import { useAppSelector } from "@store/index";

export function useFileUpload() {
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<{
    uploadProgresses: (number | undefined)[];
    uploadErrors: string[];
    uploadedFiles: TripFile[];
  }>({
    uploadProgresses: [],
    uploadErrors: [],
    uploadedFiles: [],
  });

  const uploadFiles = (path: string, files: DocumentToUpload[]) => {
    const storage = getStorage();

    files.forEach((file, index) => {
      if (!file?.file) {
        return;
      }
      const storageRef = ref(
        storage,
        `user-data/${user?.uid}/${path}/${file.fileName} `,
      );
      const uploadTask = uploadBytesResumable(storageRef, file.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const newProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgresses];
            newProgresses[index] = newProgress;
            return {
              ...prevState,
              uploadProgresses: newProgresses,
            };
          });
        },
        (error) => {
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgresses];
            newProgresses[index] = undefined;

            const newErrors = [...prevState.uploadErrors];
            newErrors[index] = `Something went wrong: ${error.message}`;
            return {
              ...prevState,
              uploadProgresses: newProgresses,
              uploadErrors: newErrors,
            };
          });
        },
        () => {
          setState((prevState) => {
            const newProgresses = [...prevState.uploadProgresses];
            newProgresses[index] = undefined;

            const newUploadedFiles = [...prevState.uploadedFiles];
            newUploadedFiles[index] = {
              fileName: file.fileName,
              storagePath: uploadTask.snapshot.ref.fullPath,
            };
            return {
              ...prevState,
              uploadProgresses: newProgresses,
            };
          });
        },
      );
    });
  };
  return {
    ...state,
    uploadFiles,
  };
}
