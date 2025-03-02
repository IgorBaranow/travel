import { useEffect, useRef } from "react";
import {
  Controller,
  type SubmitHandler,
  type UseFieldArrayUpdate,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Box, FormHelperText, Stack } from "@mui/material";

import useToast from "@hooks/useToast";
import { getDownloadURL, useStorage } from "@services/firebase";

import {
  ACCEPTED_DOCUMENT_FORMATS,
  ACCEPTED_PHOTO_FORMATS,
  MAX_FILE_SIZE_MB,
  MAX_TRIP_PHOTOS,
} from "../../constants";
import type { DocumentToUpload, TripFile } from "../../types";
import DocumentCard from "./DocumentCard";
import PhotoCard from "./PhotoCard";
import UploadFileButton from "./UploadFileButton";

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  onChange: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
  type: "document" | "photo";
}

interface FormInput {
  files: DocumentToUpload[];
}

export default function FilesForm(props: Props) {
  const {
    files,
    onSubmit,
    handleSubmit,
    control,
    onFileInputChange,
    onFileRemove,
    onFileAdd,
    fileInputRef,
    uploadProgresses,
    removingFilePath,
    uploadErrors,
  } = useFilesUploadForm(props);
  const isPhotosForm = props.type === "photo";
  const isDocumentsForm = props.type === "document";
  const acceptedFileFormats = isPhotosForm
    ? ACCEPTED_PHOTO_FORMATS
    : ACCEPTED_DOCUMENT_FORMATS;

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      direction="row"
      flexWrap="wrap"
      gap={{ sx: 1, md: 2 }}
      rowGap={{ xs: 1, md: 2 }}
      columnGap={{ xs: 1, md: 2 }}
      sx={{ width: "100%" }}
    >
      <UploadFileButton
        onClick={onFileAdd}
        mainText={`Upload ${props.type}`}
        subText={`${acceptedFileFormats} (max. ${MAX_FILE_SIZE_MB}MB)`}
        showSubText
        sx={{
          width: { xs: "100%", md: isPhotosForm ? 261 : 200 },
          height: { xs: 140, md: isPhotosForm ? 250 : 260 },
        }}
      />

      {files.map((file, index) => {
        const showCard = Boolean(file?.url || file.storagePath);

        return (
          <Stack
            key={file.fileName}
            sx={{ height: isPhotosForm ? { xs: 171, md: 250 } : 260 }}
          >
            {showCard && (
              <>
                {isDocumentsForm && (
                  <DocumentCard
                    name={file.fileName}
                    url={file.url}
                    onRemoveClick={() => onFileRemove(index)}
                    uploadProgress={uploadProgresses[index]}
                    isRemoving={Boolean(
                      file.storagePath && removingFilePath === file.storagePath,
                    )}
                  />
                )}
                {isPhotosForm && (
                  <Box
                    sx={{
                      width: { xs: 171, md: 261 },
                      height: { xs: 171, md: 250 },
                    }}
                  >
                    <PhotoCard
                      src={file.url}
                      onRemoveClick={() => onFileRemove(index)}
                      uploadProgress={uploadProgresses[index]}
                      isRemoving={Boolean(
                        file.storagePath &&
                          removingFilePath === file.storagePath,
                      )}
                    />
                  </Box>
                )}
              </>
            )}

            {uploadErrors[index] && (
              <FormHelperText error>{uploadErrors[index]}</FormHelperText>
            )}
            <Controller
              name={`files.${index}`}
              control={control}
              rules={{ required: "Please specify trip name!" }}
              render={({ field }) => (
                <input
                  ref={index === files.length - 1 ? fileInputRef : null}
                  type="file"
                  id="fileInput"
                  hidden
                  accept={acceptedFileFormats}
                  onChange={(event) => onFileInputChange(event, field.onChange)}
                />
              )}
            />
          </Stack>
        );
      })}
      {props.SubmitComponent}
    </Stack>
  );
}

function useFilesUploadForm(props: Props) {
  const { showErrorMessage } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { watch, handleSubmit, control } = useForm<FormInput>({
    defaultValues: { files: props.defaultFiles },
  });
  const files = watch("files");
  const { append, remove, update } = useFieldArray({
    control,
    name: "files",
  });

  const {
    uploadFiles,
    uploadProgresses,
    removeFile,
    isLoading,
    removingFilePath,
    uploadErrors,
  } = useStorage({
    onAllUploadSuccess: (uploadedFiles) => {
      props.onSubmit(uploadedFiles);
    },
    onOneUploadSuccess: (index, uploadedFile) => {
      update(index, uploadedFile);
    },
  });

  const disableChange = isLoading || Boolean(removingFilePath);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (disableChange) return;

    const filteredFiles = [...data.files];

    if (
      filteredFiles.length > 0 &&
      !filteredFiles[filteredFiles.length - 1].fileName
    ) {
      filteredFiles.pop();
    }

    if (filteredFiles.length === 0) {
      props.onSubmit([]);
      return;
    }

    uploadFiles(`${props.type}s`, filteredFiles);
  };

  const onFileAdd = () => {
    if (disableChange) return;

    if (
      props.type === "photo" &&
      files.length >= MAX_TRIP_PHOTOS &&
      !(!files[files.length - 1].fileName && files.length === MAX_TRIP_PHOTOS)
    ) {
      return showErrorMessage(
        `You can only upload maximum of ${MAX_TRIP_PHOTOS} photos!`,
      );
    }
    if (files.length === 0 || files[files.length - 1]?.fileName) {
      append({ fileName: "" });
    }
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const onFileRemove = async (index: number) => {
    if (disableChange) return;
    const file = files[index];
    if (file?.storagePath) {
      const wasFileRemoved = await removeFile(file.storagePath);
      if (wasFileRemoved) {
        remove(index);
        props.onChange([...files.slice(0, index), ...files.slice(index + 1)]);
      }
    } else {
      remove(index);
    }
  };

  const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: DocumentToUpload) => void,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1024 * 1024 * MAX_FILE_SIZE_MB) {
      return showErrorMessage(
        `File size is too big. Maximum size is: ${MAX_FILE_SIZE_MB}MB`,
      );
    }
    if (files.find((existingFile) => existingFile.fileName === file.name)) {
      if (!files[files.length - 1]?.fileName) onFileRemove(files.length - 1);
      return showErrorMessage(
        "You've already uploaded file with the same name!",
      );
    }
    onChange({
      fileName: file.name,
      file,
      url: URL.createObjectURL(file),
    });
  };

  useFilesUrlsUpdate(files, update);

  return {
    onSubmit,
    files,
    handleSubmit,
    control,
    onFileInputChange,
    onFileRemove,
    fileInputRef,
    onFileAdd,
    uploadProgresses,
    removingFilePath,
    uploadErrors,
  };
}

function useFilesUrlsUpdate(
  files: DocumentToUpload[],
  update: UseFieldArrayUpdate<FormInput, "files">,
) {
  useEffect(() => {
    files.forEach(async (file, index) => {
      if (!file.url && file.storagePath) {
        const url = await getDownloadURL(file.storagePath);
        if (url) {
          update(index, { ...files[index], url });
        }
      }
    });
  }, [files, update]);
}
