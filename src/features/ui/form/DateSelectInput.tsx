import { type Control, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  name: string;
  label: string;
  requireErrorText?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
}
export default function DateSelectInput({
  control,
  name,
  requireErrorText,
  label,
  maxDate,
  minDate,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requireErrorText }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <DatePicker
          label={label}
          slotProps={{
            textField: {
              inputRef: ref,
              variant: "standard",
              helperText: fieldState.error?.message,
              error: Boolean(fieldState.error),
            },
            inputAdornment: { position: "start" },
          }}
          {...field}
          sx={{
            width: "100%",
            "& .MuiSvgIcon-root": { ml: 0.1 },
          }}
          maxDate={maxDate}
          minDate={minDate}
        />
      )}
    />
  );
}
