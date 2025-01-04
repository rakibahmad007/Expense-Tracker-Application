import React from 'react';

export function ExpenseTableHeader() {
    const headers = ['Date', 'Title', 'Category', 'Amount'];
    
    return (
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  }