import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

export const useExpenses = () => {
    return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

    // Fetch expenses whenever the token changes
    useEffect(() => {
        const fetchExpenses = async () => {
            if (!token) {
                console.error('No token found. Please log in.');
                setExpenses([]); // Clear expenses when user logs out
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/expenses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };
        fetchExpenses();
    }, [BASE_URL, token]); // Dependency on BASE_URL and token

    const addExpense = async (expense) => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/expenses`, expense, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses([...expenses, response.data]);
        } catch (error) {
            console.error('Failed to add expense:', error);
        }
    };

    const updateExpense = async (id, updatedExpense) => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }
        try {
            const response = await axios.put(`${BASE_URL}/api/expenses/${id}`, updatedExpense, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.map(expense => (expense._id === id ? response.data : expense)));
        } catch (error) {
            console.error('Failed to update expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }
        try {
            await axios.delete(`${BASE_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    const resetExpenses = () => {
        setExpenses([]);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense, resetExpenses, setToken }}>
            {children}
        </ExpenseContext.Provider>
    );
};
