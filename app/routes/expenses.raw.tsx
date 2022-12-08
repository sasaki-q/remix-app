import { getExpenses } from "~/server/expenses.server";

export const loader = () => getExpenses()