import { Link } from "@remix-run/react"

type Props = {
  id: string
  title: string
  amount: number
}

export const ExpenseListItem = ({ id, title, amount }: Props) => {
  const deleteExpenseItemHandler = () => {}

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}
