import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../contexts/ExpenseContext';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const navigate = useNavigate();
  const { expenses } = useExpenses();
  
  // Group expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  // Calculate monthly totals for the last 6 months
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[monthYear] = (acc[monthYear] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Forecast next month's expenses (simple average-based forecast)
  const monthlyValues = Object.values(monthlyData);
  const averageExpense = monthlyValues.length > 0 
    ? monthlyValues.reduce((a, b) => a + b) / monthlyValues.length 
    : 0;

  const barChartData = {
    labels: [...Object.keys(monthlyData), 'Next Month (Forecast)'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [...Object.values(monthlyData), averageExpense],
        backgroundColor: [
          ...Array(Object.keys(monthlyData).length).fill('#36A2EB'),
          '#FF6384' // Forecast bar in different color
        ]
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses & Forecast'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Expense Analytics</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Expense Distribution by Category</h2>
            <div className="aspect-square">
              <Pie data={pieChartData} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Monthly Expense Trend & Forecast</h2>
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;