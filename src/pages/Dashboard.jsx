import React from 'react';

import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/Expense/ExpenseForm';
import ExpenseList from '../components/Expense/ExpenseList';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                            <button
                                onClick={() => navigate('/reports')}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View Reports
                            </button>
                            <button
                                onClick={() => navigate('/analytics')}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Analytics
                            </button>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4 text-gray-400">Welcome, {user?.name || user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-medium text-white mb-4">Add New Expense</h2>
                        <ExpenseForm />
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-white mb-4">Recent Expenses</h2>
                        <ExpenseList />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;