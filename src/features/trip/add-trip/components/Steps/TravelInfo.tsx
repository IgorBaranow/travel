import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ButtonBase, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import DateSelectInput from "@features/ui/form/DateSelectInput";
import useDialog from "@hooks/useDialog";

import PreviewImageDialog from "../../../components/PreviewImageDialog";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  previewImage: string | null;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

export default function LoginForm() {
  const { isOpen, open, close } = useDialog();
  const { handleSubmit, control, onSubmit, formValues } = useTravelInfoForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <ButtonBase
          onClick={open}
          sx={{
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 0.5,
            height: 152,
            minWidth: { xs: "100%", md: 152 },
            border: 1,
            borderColor: "text.secondary",
          }}
        >
          <ImageSearchIcon sx={{ color: Colors.disabled }} />
          <Typography variant="subtitle1" color={Colors.disabled}>
            Preview image
          </Typography>
        </ButtonBase>
        <Stack sx={{ width: "100%" }} gap={3}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please specify trip name!" }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Trip Name"
                autoFocus
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
          <Stack direction="row" gap={2}>
            <DateSelectInput
              label="Start date"
              name="startDate"
              control={control}
              requireErrorText="Please specify start date!"
              maxDate={formValues.endDate}
            />
            <DateSelectInput
              label="End date"
              name="endDate"
              control={control}
              requireErrorText="Please specify end date!"
              minDate={formValues.startDate}
            />
          </Stack>
        </Stack>
      </Stack>
      <Controller
        name="description"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            multiline
            maxRows={6}
            inputProps={{ maxLength: 200 }}
            helperText={
              fieldState.error?.message ?? `${field.value.length}/200`
            }
            error={Boolean(fieldState.error)}
            {...field}
          />
        )}
      />
      <Pagination />
      <PreviewImageDialog isOpen={isOpen} onClose={close} />
    </Stack>
  );
}

function useTravelInfoForm() {
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      name: "",
      description: "",
      startDate: null,
      endDate: null,
    },
  });
  const formValues = watch();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    // TODO: Save step info
    console.log(data);
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    formValues,
  };
}
