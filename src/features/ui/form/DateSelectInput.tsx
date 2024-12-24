import dayjs from "dayjs";
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
          onChange={(newValue) => {
            let value;
            try {
              value = dayjs(newValue).toISOString();
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_) {
              /* empty */
            }
            field.onChange(value ?? newValue);
          }}
          sx={{
            width: "100%",
            "& .MuiSvgIcon-root": { ml: 0.1 },
          }}
          value={
            field.value && !dayjs.isDayjs(field.value)
              ? dayjs(field.value)
              : field.value
          }
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          minDate={minDate ? dayjs(minDate) : undefined}
        />
      )}
    />
  );
}
