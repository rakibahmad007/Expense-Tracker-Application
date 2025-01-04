import React from 'react';
import { useState } from 'react';
import { ExpenseForm } from '../components/Expense/ExpenseForm';
import { ExpenseTable } from '../components/Expense/ExpenseTable';

function Dashboard() {
    const [expense, setExpense] = useState({ title: '', amount: '', category: '', date: '' });
    const [expenses, setExpenses] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: Date.now(), // Temporary ID solution until we have a backend
            ...expense,
        };
        setExpenses([newExpense, ...expenses]);
        // Reset form
        setExpense({ title: '', amount: '', category: '', date: '' });
    };

    return (
    <div className="max-w-4xl mx-auto bg-dark-contrast">
        <div className="grid grid-cols-1 gap-6">
            <div>
                <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
                <ExpenseForm 
                    expense={expense} 
                    setExpense={setExpense} 
                    onSubmit={handleSubmit} 
                />
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-6">Recent Expenses</h2>
                <ExpenseTable expenses={expenses} />
            </div>
        </div>
    </div>
  );
}

export default Dashboard;