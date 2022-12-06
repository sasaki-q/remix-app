// /expenses => share this component

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa"
import { ExpensesList } from "~/components/expenses";
import { getExpenses } from "~/server/expenses.server";
import expensesStyles from "~/styles/expenses.css"

export default function ExpensesLayput() {
    const data = useLoaderData()
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
                <ExpensesList expenses={data}/>
            </main>
        </>
    )
}

export const links = () => [
    {rel: "stylesheet", href: expensesStyles},
]

export const loader = () => getExpenses()