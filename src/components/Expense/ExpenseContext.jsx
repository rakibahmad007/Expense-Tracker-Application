import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

export const useExpenses = () => {
    return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const BASE_URL = import.meta.env.VITE_SERVER_URL ;

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Please log in.');
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
    }, [BASE_URL]);

    const addExpense = async (expense) => {
        const token = localStorage.getItem('token');
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
        const token = localStorage.getItem('token');
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
        const token = localStorage.getItem('token');
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

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};