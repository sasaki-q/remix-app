import { Form, Link, useFetcher } from "@remix-run/react"

type Props = {
  id: string
  title: string
  amount: number
}

export const ExpenseListItem = ({ id, title, amount }: Props) => {
  const fetcher = useFetcher()

  // add confirmation step
  const submitHandler = () => fetcher.submit(null, { 
    method: "delete", 
    action: `/expenses/${id}`
  })

  if(fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting ...</p>
      </article>
    )
  }


  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button formMethod="delete" onClick={submitHandler}>Delete</button>
        </Form> */}
        <button onClick={submitHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}
