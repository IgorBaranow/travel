import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  Box,
  ButtonBase,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import DateSelectInput from "@features/ui/form/DateSelectInput";
import useDialog from "@hooks/useDialog";
import { useAppDispatch, useAppSelector } from "@store/index";

import PreviewImageDialog from "../../../components/PreviewImageDialog";
import { usePreviewImageSrc } from '../../../hooks/usePreviewImageHook';
import type { Trip } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setTravelInformation,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  previewImage: Trip["previewImage"];
  name: Trip["name"];
  description: Trip["description"];
  startDate: Trip["startDate"];
  endDate: Trip["endDate"];
}

export default function TripInfo() {
  const { isOpen, open, close } = useDialog();
  const {
    handleSubmit,
    control,
    onSubmit,
    formValues,
    register,
    onPreviewImageSave,
    errors,
    previewImageSrc,
  } = useTravelInfoForm({ closePreviewImageDialog: close });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <Stack>
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
            {" "}
            {previewImageSrc ? (
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  objectFit: "cover",
                }}
                src={previewImageSrc}
                alt="Trip preview"
              />
            ) : (
              <>
                <ImageSearchIcon sx={{ color: Colors.disabled }} />
                <Typography variant="subtitle1" color={Colors.disabled}>
                  Preview image
                </Typography>
              </>
            )}
          </ButtonBase>
          {errors.previewImage && (
            <FormHelperText error sx={{ maxWidth: 152 }}>
              {errors.previewImage.message}
            </FormHelperText>
          )}
          <input
            type="hidden"
            {...register("previewImage", {
              required: "Please select a preview image!",
            })}
          />
        </Stack>

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
              fullWidth
            />
            <DateSelectInput
              label="End date"
              name="endDate"
              control={control}
              requireErrorText="Please specify end date!"
              minDate={formValues.startDate}
              fullWidth
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
      <PreviewImageDialog
        isOpen={isOpen}
        onClose={close}
        onSave={onPreviewImageSave}
      />
    </Stack>
  );
}

function useTravelInfoForm({
  closePreviewImageDialog,
}: {
  closePreviewImageDialog: () => void;
}) {
  const trip = useAppSelector(selectWizardTrip);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      previewImage: trip.previewImage,
    },
  });
  const formValues = watch();
  const previewImageSrc = usePreviewImageSrc(formValues.previewImage);


  const onPreviewImageSave = (previewImage: Trip["previewImage"]) => {
    closePreviewImageDialog();
    setValue("previewImage", previewImage);
    trigger("previewImage");
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setTravelInformation(data));
    dispatch(nextStep());
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    formValues,
    register,
    errors,
    previewImageSrc,
    onPreviewImageSave,
  };
}
