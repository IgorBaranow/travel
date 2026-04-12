import type { Expense } from '../types';

export function getTripTotalBudget(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}