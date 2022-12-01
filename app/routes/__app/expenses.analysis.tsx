import { DUMMY_DATA } from "~/utils/constants"
import { 
    Chart,
    ExpenseStatistics,
} from "~/components/expenses"

export default function AnalysisExpensesPage() {
    return (
        <main>
            <Chart expenses={DUMMY_DATA}/>
            <ExpenseStatistics expenses={DUMMY_DATA}/>
        </main>
    )
}