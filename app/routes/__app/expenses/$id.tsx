import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses";
import { Modal } from "~/components/util";
import { getExpense, updateExpense, deleteExpense } from "~/server/expenses.server";
import { ExpensesType } from "~/types/expenses";

export default function UpdateExpensesPage() {
    const navigate = useNavigate()
    const closeHandler = () => navigate("..")

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm/>
        </Modal>
    )
}

export const loader = ({params}: {params:{ id: string }}) => params.id ? getExpense(params.id) : undefined

type UpdateActionParam = {
    params: { id: string }
    request: Request
}

export const action = async({ params , request }: UpdateActionParam) => {
    const id = params.id

    if(request.method === "PATCH") {
        const formData = await request.formData()
        const expenseData = Object.fromEntries(formData) as unknown as ExpensesType

        await updateExpense(id, expenseData)
        return redirect("/expenses")
    }

    if(request.method === "DELETE") {
        await deleteExpense(id)
        return { deletedId: id }
    }
}