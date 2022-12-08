import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses";
import { Modal } from "~/components/util";
import { requireUserSession } from "~/server/auth.server";
import { addExpense } from "~/server/expenses.server";
import { ExpensesType } from "~/types";

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
    const userId = await requireUserSession(request)

    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData) as unknown as Omit<ExpensesType, "userId">

    // useActionData cache this error
    // if(expenseData.title.length < 10) {
    //     return "title must be at least 10 characters"
    // }

    await addExpense({...expenseData, userId: userId})
    return redirect("/expenses")
}