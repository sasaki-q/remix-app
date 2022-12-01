// pathless component

import { Outlet } from "@remix-run/react"
import { MainHeader } from "~/components/navigation"
import expensesStyle from "~/styles/expenses.css"

export default function ExpensesAppLayout() {
    return (
        <>
            <MainHeader/>
            <Outlet/>
        </>
    )
}

export const links = () => [
    {rel: "stylesheet", href: expensesStyle}
]