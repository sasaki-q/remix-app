import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses";
import { Modal } from "~/components/util";
import { addExpense } from "~/server/expenses.server";
import { ExpensesType } from "~/types/expenses";

export default function AddExpensesPage() {
    const navigate = useNavigate()
    const closeHandler = () => navigate("..")

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm/>
        </Modal>
    )
}

export const action = async({ request }: {request: Request}) => {
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData) as any as ExpensesType

    const res = await addExpense(expenseData)
    console.log("DEBUG prisma response === ", res)

    return redirect("/expenses")
}