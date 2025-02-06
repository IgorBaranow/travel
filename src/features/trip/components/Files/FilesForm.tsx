import { useRef } from "react";
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Stack } from "@mui/material";

import { MAX_FILE_SIZE_MB } from "../../constants";
import type { TripFile } from "../../types";
import DocumentCard from "./DocumentCard";
import UploadFileButton from "./UploadFileButton";

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  files: TripFile[];
}

export default function FilesForm(props: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { files, onSubmit, handleSubmit, control, onFileInputChange } =
    useFilesUploadForm(props);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <UploadFileButton
        onClick={() => fileInputRef.current?.click()}
        mainText={"Upload document "}
        subText={`PDF (max. ${MAX_FILE_SIZE_MB}MB)`}
        showSubText
        sx={{ width: { xs: "100%", md: 200 }, height: { xs: 140, md: 260 } }}
      />
      <Controller
        name="files.0"
        control={control}
        rules={{ required: "Please specify trip name!" }}
        render={({ field }) => (
          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            hidden
            onChange={(event) => onFileInputChange(event, field.onChange)}
          />
        )}
      />
      {files.map((file) => {
        const showCard = Boolean(file);
        if (!showCard) {
          return null;
        }
        return <DocumentCard name={file.fileName} url={file.url} />;
      })}
      {props.SubmitComponent}
    </Stack>
  );
}

function useFilesUploadForm({ defaultFiles }: Props) {
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
    console.log(data);
  };

  const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: TripFile) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    onChange({
      fileName: file?.name,
      url: URL.createObjectURL(file), // create a local URL to the file that I added to the input. Generates temperarry URL through which I am able to access the file.
    });
  };

  return {
    onSubmit,
    handleSubmit,
    files,
    control,
    onFileInputChange,
  };
}
