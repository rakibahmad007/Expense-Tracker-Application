import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

export const useExpenses = () => {
    return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('http://localhost:5000/api/expenses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            }
        };
        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/expenses', expense, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses([...expenses, response.data]);
    };

    const updateExpense = async (id, updatedExpense) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/api/expenses/${id}`, updatedExpense, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(expenses.map(expense => (expense._id === id ? response.data : expense)));
    };

    const deleteExpense = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(expenses.filter(expense => expense._id !== id));
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};