import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { EXPENSES_CATEGORIES, EXPENSE_ICON_BY_CATEGORY } from "../../data";
import { Expense } from "../../types";
import ExpenseCategoryIcon from "./ExpenseCategoryIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addedExpense: Expense) => void;
}

interface FormInput {
  category: Expense["category"];
  amount: Expense["amount"];
  description: Expense["description"];
}

export default function ExpenseDialog(props: Props) {
  const { md } = useBreakpoints();

  const {
    handleSubmit,
    control,
    onSubmit,
    errors,
    register,
    selectedCategory,
    onCategoryClick,
    onReset,
  } = useExpenseForm(props);

  return (
    <AppDialog
      title="Add expense"
      isOpen={props.isOpen}
      onClose={onReset}
      primaryButtonText="Save"
      isForm
      onPrimaryButtonClick={handleSubmit(onSubmit)}
      maxWidth={684}
    >
      <Stack sx={{ width: "100%" }} gap={4}>
        <Box>
          <Grid
            container={!md}
            display={{ xs: "grid", md: "flex" }}
            gridTemplateColumns="repeat(3, 75px)"
            columnGap={{ xs: 5, sm: 20, md: 0 }}
            justifyContent="space-between"
            rowGap={2}
          >
            {EXPENSES_CATEGORIES.map(({ id, category }) => {
              const iconInfo = EXPENSE_ICON_BY_CATEGORY[category];
              return (
                <Grid
                  item
                  gap={1}
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  key={id}
                >
                  <ExpenseCategoryIcon
                    category={category}
                    onClick={() => onCategoryClick(category)}
                    color={iconInfo.color}
                    backgroundColor={iconInfo.backgroundColor}
                    borderColor={
                      category === selectedCategory ? iconInfo.color : "white"
                    }
                  >
                    {" "}
                    {<iconInfo.icon fontSize="large" />}
                  </ExpenseCategoryIcon>
                  <Typography variant="subtitle1">{category}</Typography>
                </Grid>
              );
            })}

            <input
              type="hidden"
              {...register("category", {
                required: "Please select a category!",
              })}
            />
          </Grid>
          {errors.category && (
            <FormHelperText error>{errors.category.message}</FormHelperText>
          )}
        </Box>

        <Stack gap={3}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Please specify the amount!",
              validate: {
                positiveNumber: (value) =>
                  value > 0 ? undefined : "Amount should be greater than zero",
              },
            }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                type="number"
                inputRef={ref}
                variant="standard"
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
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
                helperText={
                  fieldState.error?.message ?? `${field.value.length}/200`
                }
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
        </Stack>
      </Stack>
    </AppDialog>
  );
}

function useExpenseForm({ onSave, onClose }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
    watch,
    resetField,
    reset,
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      amount: "" as unknown as number,
      description: "",
      category: undefined,
    },
  });

  const selectedCategory = watch("category");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSave({ id: uuidv4(), ...data });
    onReset();
  };

  const onReset = () => {
    onClose();
    resetField("category");
    reset();
  };

  const onCategoryClick = (category: Expense["category"]) => {
    setValue("category", category);
    trigger("category");
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    errors,
    setValue,
    register,
    selectedCategory,
    onReset,
    onCategoryClick,
  };
}
