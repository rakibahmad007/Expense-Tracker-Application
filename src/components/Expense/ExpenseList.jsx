import React from 'react';

import { useState } from 'react';
import { useExpenses } from '../Expense/ExpenseContext';
import ExpenseForm from './ExpenseForm';

function ExpenseList() {
  const { expenses, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
      
    }
  };

  return (
    <div className="space-y-4">
      {expenses.map(expense => (
        <div key={expense._id} className="bg-white p-4 rounded-lg shadow">
          {editingExpense?._id === expense._id ? (
            <ExpenseForm
              expense={expense}
              onSubmit={() => setEditingExpense(null)}
              onCancel={() => setEditingExpense(null)}
            />
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()} - {expense.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Tk. {Number(expense.amount).toFixed(2)}</span>
                <button
                  onClick={() => handleEdit(expense)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;