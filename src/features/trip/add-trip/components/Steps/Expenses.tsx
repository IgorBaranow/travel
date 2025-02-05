import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

import ExpensesTable from "@features/trip/components/Expenses/ExpensesTable";
import AppButton from "@features/ui/AppButton";
import useDialog from "@hooks/useDialog";
import { useAppDispatch, useAppSelector } from "@store/index";

import ExpenseDialog from "../../../components/Expenses/ExpenseDialog";
import type { Expense, Trip } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setExpenses,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  expenses: Trip["expenses"];
}

export default function Expenses() {
  const { open, close, isOpen } = useDialog();
  const { expenses, onSubmit, handleSubmit, addExpense, removeExpense } =
    useExpensesForm({
      closeExpenseDialog: close,
    });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <AppButton
        variant="outlined"
        onClick={open}
        endIcon={<AddIcon />}
        fullWidth
      >
        Add Expense
      </AppButton>
      <ExpenseDialog onSave={addExpense} isOpen={isOpen} onClose={close} />
      {expenses.length > 0 && (
        <ExpensesTable expenses={expenses} onDelete={removeExpense} />
      )}
      <Pagination />
    </Stack>
  );
}

function useExpensesForm({
  closeExpenseDialog,
}: {
  closeExpenseDialog: () => void;
}) {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);
  const { watch, handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      expenses: trip.expenses,
    },
  });
  const expenses = watch("expenses");
  const { append, remove } = useFieldArray({
    control,
    name: "expenses",
  });

  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense];
    dispatch(setExpenses(updatedExpenses));
    append(expense);
    closeExpenseDialog();
  };

  const removeExpense = (expenseId: string) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== expenseId);
    dispatch(setExpenses(updatedExpenses));
    remove(expenses.findIndex((expense) => expense.id === expenseId));
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setExpenses(data.expenses));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    expenses,
    handleSubmit,
    addExpense,
    removeExpense,
  };
}
