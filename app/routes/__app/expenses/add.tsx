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
    const expenseData = Object.fromEntries(formData) as unknown as ExpensesType

    // useActionData cache this error
    // if(expenseData.title.length < 10) {
    //     return "title must be at least 10 characters"
    // }

    await addExpense(expenseData)
    return redirect("/expenses")
}