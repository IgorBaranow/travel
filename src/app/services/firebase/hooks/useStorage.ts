import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

import { selectUser } from "@features/auth/store/authSlice";
import { DocumentToUpload, TripFile } from "@features/trip/types";
import useToast from "@hooks/useToast";
import { useAppSelector } from "@store/index";

import { storage } from "../firebase";

interface Props {
  onAllUploadSuccess: (uploadedFiles: TripFile[]) => void;
}

interface State {
  uploadProgresses: (number | undefined)[];
  uploadErrors: string[];
  uploadedFiles: TripFile[];
  totalFiles: number;
  isLoading: boolean;
  uploadedFilesCount: number;
  removingFilePath: null | string;
}

const defaultState: State = {
  isLoading: false,
  uploadProgresses: [],
  uploadErrors: [],
  uploadedFiles: [],
  totalFiles: 0,
  uploadedFilesCount: 0,
  removingFilePath: null,
};

export function useStorage({ onAllUploadSuccess }: Props) {
  const user = useAppSelector(selectUser);
  const { showErrorMessage } = useToast();
  const [state, setState] = useState<State>(defaultState);

  useEffect(() => {
    if (
      state.totalFiles > 0 &&
      state.uploadedFilesCount + state.uploadErrors.filter(Boolean).length ===
        state.totalFiles
    ) {
      onAllUploadSuccess(state.uploadedFiles);
      setState(defaultState);
    }
  }, [
    state.totalFiles,
    state.uploadedFilesCount,
    state.uploadErrors,
    state.uploadedFiles,
    onAllUploadSuccess,
  ]);

  const uploadFiles = (path: string, files: (DocumentToUpload | null)[]) => {
    setState({
      isLoading: true,
      uploadProgresses: Array(files.length).fill(undefined),
      uploadErrors: Array(files.length).fill(""),
      uploadedFiles: Array(files.length).fill(null) as unknown as TripFile[],
      totalFiles: files.length,
      uploadedFilesCount: 0,
      removingFilePath: null,
    });

    files.forEach((file, index) => {
      if (file?.storagePath) {
        setState((prev) => ({
          ...prev,
          uploadedFiles: prev.uploadedFiles.map((f, i) =>
            i === index ? file : f,
          ),
          uploadedFilesCount: prev.uploadedFilesCount + 1,
        }));
        return;
      }

      if (!file?.file) {
        setState((prev) => {
          const newErrors = [...prev.uploadErrors];
          newErrors[index] = "We are unable to get the file to upload it!";
          return { ...prev, uploadErrors: newErrors };
        });
        return;
      }

      const storageRef = ref(
        storage,
        `user-data/${user?.uid}/${path}/${file.fileName}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, file.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setState((prev) => {
            const newProgresses = [...prev.uploadProgresses];
            newProgresses[index] = progress;
            return { ...prev, uploadProgresses: newProgresses };
          });
        },
        (error) => {
          setState((prev) => {
            const newErrors = [...prev.uploadErrors];
            newErrors[index] = `Something went wrong: ${error.message}`;
            return { ...prev, uploadErrors: newErrors };
          });
        },
        () => {
          setState((prev) => {
            const newUploadedFiles = [...prev.uploadedFiles];
            newUploadedFiles[index] = {
              fileName: file.fileName,
              storagePath: uploadTask.snapshot.ref.fullPath,
              url: "",
            };
            return {
              ...prev,
              uploadedFiles: newUploadedFiles,
              uploadedFilesCount: prev.uploadedFilesCount + 1,
              uploadProgresses: prev.uploadProgresses.map((p, i) =>
                i === index ? undefined : p,
              ),
            };
          });
        },
      );
    });
  };

  const removeFile = async (storagePath: string) => {
    const desertRef = ref(storage, storagePath);
    setState((prev) => ({ ...prev, removingFilePath: storagePath }));
    try {
      await deleteObject(desertRef);
      return true;
    } catch (error) {
      showErrorMessage(
        "Failed to remove file. Please try again later or contact support!",
      );
      console.log(error);
    } finally {
      setState((prev) => ({ ...prev, removingFilePath: null }));
    }
    return false;
  };

  return {
    ...state,
    uploadFiles,
    removeFile,
  };
}
