import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../components/Expense/ExpenseContext';
import ExpenseForm from '../components/Expense/ExpenseForm';

function Reports() {
  const navigate = useNavigate();
  const { expenses, deleteExpense } = useExpenses();
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = expenses.filter(expense => 
    expense.date >= dateRange.start && expense.date <= dateRange.end
  );

  const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
    if (!acc[expense.date]) {
      acc[expense.date] = [];
    }
    acc[expense.date].push(expense);
    return acc;
  }, {});

  const totalExpense = filteredExpenses.reduce((sum, expense) => 
    sum + Number(expense.amount), 0
  );

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">Expense Reports</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium">Total Expenses: Tk. {totalExpense.toFixed(2)}</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(groupedExpenses)
              .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
              .map(([date, dayExpenses]) => (
                <div key={date} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {new Date(date).toLocaleDateString()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Total: Tk. {dayExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedDay(expandedDay === date ? null : date)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {expandedDay === date ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  {expandedDay === date && (
                    <div className="mt-4 space-y-4">
                      {dayExpenses.map(expense => (
                        <div key={expense.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          {editingExpense?.id === expense.id ? (
                            <ExpenseForm
                              expense={expense}
                              onSubmit={() => setEditingExpense(null)}
                              onCancel={() => setEditingExpense(null)}
                            />
                          ) : (
                            <>
                              <div>
                                <p className="font-medium">{expense.description}</p>
                                <p className="text-sm text-gray-500">{expense.category}</p>
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
                                  onClick={() => handleDelete(expense.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Add New Expense for {new Date(date).toLocaleDateString()}</h4>
                        <ExpenseForm expense={{ date }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;