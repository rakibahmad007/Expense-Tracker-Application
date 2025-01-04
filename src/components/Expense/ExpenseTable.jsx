import React from 'react';
import { ExpenseTableHeader } from './ExpenseTableHeader';
import { ExpenseTableRow } from './ExpenseTableRow';

export function ExpenseTable({ expenses }) {
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
                <ExpenseTableHeader />
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {expenses.map((expense) => (
                        <ExpenseTableRow key={expense.id} expense={expense} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
