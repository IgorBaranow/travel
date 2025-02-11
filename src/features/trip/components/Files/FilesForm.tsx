import { Fragment, useRef } from "react";
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Stack } from "@mui/material";

import { useFileUpload } from "@services/firebase";
import useToast from "@store/hooks/useToast";

import { MAX_FILE_SIZE_MB } from "../../constants";
import type { DocumentToUpload, TripFile } from "../../types";
import DocumentCard from "./DocumentCard";
import UploadFileButton from "./UploadFileButton";

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
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
  } = useFilesUploadForm(props);

  return (
    <Stack
      component="form"
      direction="row"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      flexWrap="wrap"
      sx={{ width: "100%" }}
      gap={2}
    >
      <UploadFileButton
        onClick={onFileAdd}
        mainText={"Upload document "}
        subText={`PDF (max. ${MAX_FILE_SIZE_MB}MB)`}
        showSubText
        sx={{ width: { xs: "100%", md: 200 }, height: { xs: 140, md: 260 } }}
      />

      {files.map((file, index) => {
        const showCard = Boolean(file?.url);
        return (
          <Fragment key={file.fileName}>
            {showCard && (
              <DocumentCard
                name={file.fileName}
                url={file.url}
                onRemoveClick={() => onFileRemove(index)}
                uploadProgress={uploadProgresses[index]}
              />
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
                  onChange={(event) => onFileInputChange(event, field.onChange)}
                />
              )}
            />
          </Fragment>
        );
      })}
      {props.SubmitComponent}
    </Stack>
  );
}

function useFilesUploadForm({ defaultFiles }: Props) {
  const { uploadFiles, uploadProgresses } = useFileUpload();
  const { showErrorMessage } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { watch, handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      files: defaultFiles,
    },
  });
  const files = watch("files");
  const { append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    uploadFiles("documents", data.files);
  };

  const onFileRemove = (index: number) => {
    remove(index);
  };

  const onFileAdd = () => {
    if (files.length === 0 || files[files.length - 1]?.fileName) {
      append({ fileName: "" });
    }
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: DocumentToUpload) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (files.find((existingFile) => existingFile.fileName === file.name)) {
      if (!files[files.length - 1].fileName) {
        onFileRemove(files.length - 1);
      }
      return showErrorMessage(
        "You've already uploaded file with the same name!",
      );
    }

    onChange({
      fileName: file?.name,
      url: URL.createObjectURL(file), // create a local URL to the file that I added to the input. Generates temperarry URL through which I am able to access the file.
      file,
    });
  };

  return {
    onSubmit,
    handleSubmit,
    files,
    control,
    onFileInputChange,
    onFileRemove,
    fileInputRef,
    onFileAdd,
    uploadProgresses,
  };
}
