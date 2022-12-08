import { 
    Chart,
    ExpenseStatistics,
} from "~/components/expenses"
import { useLoaderData } from "@remix-run/react"
import { getExpenses } from "~/server/expenses.server"
import { json } from "@remix-run/node"
import { requireUserSession } from "~/server/auth.server"

export default function AnalysisExpensesPage() {
    const data = useLoaderData()
    return (
        <main>
            <Chart expenses={data}/>
            <ExpenseStatistics expenses={data}/>
        </main>
    )
}

export const loader = async({request}: {request: Request}) => {
    const userId = await requireUserSession(request)

    const expenses = await getExpenses(userId)
    if(!expenses || expenses.length === 0) {
        throw json(
            { message: "No Expenses" },
            { status: 404, statusText: "No Expenses" }
        )
    }

    return expenses
}