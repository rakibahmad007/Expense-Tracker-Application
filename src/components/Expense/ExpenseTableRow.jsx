import React from 'react';

export function ExpenseTableRow({ expense }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {expense.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {expense.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {expense.category}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${expense.amount}
            </td>
        </tr>
    );
}
