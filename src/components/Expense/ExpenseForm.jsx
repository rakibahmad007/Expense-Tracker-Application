import React from 'react';

import { ExpenseInput } from './ExpenseInput';
import { ExpenseSelect } from './ExpenseSelect';
import { categories } from '../../utilities/constants';

export function ExpenseForm({ expense, setExpense, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <ExpenseInput
        id="title"
        label="Title"
        type="text"
        value={expense.title}
        onChange={(value) => setExpense({ ...expense, title: value })}
        placeholder="Expense Title"
        className="text-white bg-gray-700 border-gray-600"
      />
      
      <ExpenseInput
        id="amount"
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={(value) => setExpense({ ...expense, amount: value })}
        placeholder="Amount"
        className="text-white bg-gray-700 border-gray-600"
      />
      
      <ExpenseSelect
        id="category"
        label="Category"
        value={expense.category}
        onChange={(value) => setExpense({ ...expense, category: value })}
        options={categories}
        className="text-white bg-gray-700 border-gray-600"
      />
      
      <ExpenseInput
        id="date"
        label="Date"
        type="date"
        value={expense.date}
        onChange={(value) => setExpense({ ...expense, date: value })}
        className="text-white bg-gray-700 border-gray-600"
      />
      
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}