import { Expense } from "@prisma/client";
import { 
  Form, 
  Link, 
  useActionData, 
  useLoaderData, 
  useMatches, 
  useParams, 
  useTransition as useNavigate 
} from "@remix-run/react";

export const ExpenseForm = () => {
  const today = new Date().toISOString().slice(0, 10);

  //const data = useLoaderData()
  const navigate = useNavigate()
  const validationErrorMessage = useActionData()

  const isSubmitting = navigate.state !== "idle"

  const param = useParams()
  const matchData = useMatches()
  const expenseMatchData = matchData.find(e => e.id === "routes/__app/expenses")?.data as Expense[] | undefined
  const expense = expenseMatchData?.find((e: Expense) => e.id === param.id)

  return (
    <Form 
      method={expense ? "patch" : "post"}
      className="form" 
      id="expense-form"
      //onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input 
          id="title"
          type="text" 
          name="title" 
          required 
          maxLength={30} 
          defaultValue={expense && expense.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={expense && expense.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            max={today} 
            required
            defaultValue={expense && new Date(expense.date).toISOString().slice(0, 10)}
          />
        </p>
      </div>
      <p>
        {validationErrorMessage && validationErrorMessage}
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Add Expense ..." : "Save Expense"}</button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

// const submit: SubmitFunction = useSubmit()
// const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
//   e.preventDefault()
//   submit(e.currentTarget, {
//     action: "/expenses/add",
//     method: "post",
//   })
// }