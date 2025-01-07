import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../components/Expense/ExpenseContext';
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

  // Calculate daily totals for the last 7 days
  const dailyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const day = date.toLocaleDateString('default', { day: '2-digit', month: 'short' });
    acc[day] = (acc[day] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Forecast next week's expenses (simple average-based forecast)
  const dailyValues = Object.values(dailyData);
  const averageDailyExpense = dailyValues.length > 0 
    ? dailyValues.reduce((a, b) => a + b) / dailyValues.length 
    : 0;

  const nextWeekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toLocaleDateString('default', { day: '2-digit', month: 'short' });
  });

  const weeklyBarChartData = {
    labels: nextWeekDates,
    datasets: [
      {
        label: 'Predicted Daily Expenses',
        data: Array(7).fill(averageDailyExpense),
        backgroundColor: '#FF6384'
      }
    ]
  };

  const weeklyBarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Predicted Daily Expenses for Next Week'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">Expense Analytics</h1>
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
          <div className="bg-gray-800 shadow-sm p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white">Expense Distribution by Category</h2>
            <div className="aspect-square">
              <Pie data={pieChartData} />
            </div>
          </div>

          <div className="bg-gray-800 shadow-sm p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white">Monthly Expense Trend & Forecast</h2>
            <Bar options={barChartOptions} data={barChartData} />
          </div>

          <div className="bg-gray-800 shadow-sm p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white">Predicted Daily Expenses for Next Week</h2>
            <Bar options={weeklyBarChartOptions} data={weeklyBarChartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;