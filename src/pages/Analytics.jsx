import React, { useState } from 'react';
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

  // State for date range filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter expenses based on the selected date range
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    return (
      (!startDate || expenseDate >= startDate) &&
      (!endDate || expenseDate <= endDate)
    );
  });

  // Group expenses by category
  const categoryData = filteredExpenses.reduce((acc, expense) => {
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

  // Calculate daily totals for the last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('default', { day: '2-digit', month: 'short' });
  }).reverse();

  const dailyData = last7Days.reduce((acc, day) => {
    acc[day] = 0; // Initialize each day with 0
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const day = date.toLocaleDateString('default', { day: '2-digit', month: 'short' });
    if (last7Days.includes(day)) {
      dailyData[day] += Number(expense.amount);
    }
  });

  // Calculate weighted average for the next 7 days
  const weights = [1, 2, 3, 4, 5, 6, 7]; // Weights for the past 7 days
  const totalWeight = weights.reduce((a, b) => a + b, 0); // Sum of weights
  const weightedSum = last7Days.reduce(
    (sum, day, index) => sum + dailyData[day] * weights[index],
    0
  );
  const weightedAverage = weightedSum / totalWeight;

  // Generate distinct next week's forecast with slight randomness
  const nextWeekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toLocaleDateString('default', { day: '2-digit', month: 'short' });
  });

  const nextWeekForecast = nextWeekDates.map((_, index) => {
    const randomFactor = (Math.random() - 0.5) * 0.2; // Random fluctuation between -10% to +10%
    return Math.max(0, weightedAverage * (1 + randomFactor) + index * 0.5); // Add slight variation by index
  });

  const weeklyBarChartData = {
    labels: nextWeekDates,
    datasets: [
      {
        label: 'Predicted Daily Expenses',
        data: nextWeekForecast,
        backgroundColor: '#FF6384',
      },
    ],
  };

  const weeklyBarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Predicted Daily Expenses for Next Week',
      },
    },
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
        {/* Date Filter */}
        <div className="flex space-x-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-white">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 shadow-sm p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white">Expense Distribution by Category</h2>
            <div className="aspect-square">
              <Pie data={pieChartData} />
            </div>
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