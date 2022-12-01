import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses";
import { Modal } from "~/components/util";

export default function AddExpensesPage() {
    const navigate = useNavigate()
    const closeHandler = () => navigate("..")

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm/>
        </Modal>
    )
}