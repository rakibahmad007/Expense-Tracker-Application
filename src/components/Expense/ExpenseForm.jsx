import { ExpenseInput } from './ExpenseInput';
import { ExpenseSelect } from './ExpenseSelect';
import { categories } from '../../utils/constants';

export function ExpenseForm({ expense, setExpense, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ExpenseInput
        id="title"
        label="Title"
        type="text"
        value={expense.title}
        onChange={(value) => setExpense({ ...expense, title: value })}
        placeholder="Expense Title"
      />
      
      <ExpenseInput
        id="amount"
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={(value) => setExpense({ ...expense, amount: value })}
        placeholder="Amount"
      />
      
      <ExpenseSelect
        id="category"
        label="Category"
        value={expense.category}
        onChange={(value) => setExpense({ ...expense, category: value })}
        options={categories}
      />
      
      <ExpenseInput
        id="date"
        label="Date"
        type="date"
        value={expense.date}
        onChange={(value) => setExpense({ ...expense, date: value })}
      />
      
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}