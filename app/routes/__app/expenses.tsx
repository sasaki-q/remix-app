// /expenses => share this component

import { Link, Outlet } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa"
import { ExpensesList } from "~/components/expenses";
import expensesStyles from "~/styles/expenses.css"
import { DUMMY_DATA } from "~/utils/constants";

export default function ExpensesLayput() {
    return (
        <>
            <Outlet/>
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus/>
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload/>
                        <span>Load Row Data</span>
                    </a>
                </section>
                <ExpensesList expenses={DUMMY_DATA}/>
            </main>
        </>
    )
}

export const links = () => [
    {rel: "stylesheet", href: expensesStyles},
]