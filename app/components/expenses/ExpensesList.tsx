import { ExpensesType } from '~/types';
import { ExpenseListItem } from './ExpenseListItem';

type Props = {
  expenses: ExpensesType[]
}

export const ExpensesList = ({ expenses }: Props) => {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}
