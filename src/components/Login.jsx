import React, { useState } from 'react';
import axios from 'axios';
import { MdAlternateEmail } from 'react-icons/md';
import { IoMdKey, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useExpenses } from './Expense/ExpenseContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { setToken, resetExpenses } = useExpenses(); // Access methods from ExpenseContext
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Required fields');
            return;
        }

        try {
            const response = await axios.post('https://expense-tracker-application-backend-87pi.onrender.com/api/auth/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Save token locally
                resetExpenses(); // Clear previous expenses
                setToken(response.data.token); // Update token in ExpenseContext
                login(response.data.token); // Update AuthContext
                console.log('Token received. Redirecting to /dashboard...');
                navigate('/dashboard'); // Navigate to dashboard
            } else {
                console.error('Login failed: No token received');
                toast.error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed: ' + error.message);
        }
    };

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className='bg-gray-800 px-16 py-12 max-w-[1100px] w-full md:w-1/2 lg:w-1/3'>
                <h2 className='text-3xl font-semibold text-left uppercase text-white mb-4'>Login</h2>
                <h3 className='text-3xl text-left text-gray-400 uppercase mb-2'>Already registered?</h3>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'> Login if you're already our beloved user!</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='flex items-center gap-2 p-2 border border-gray-600 bg-gray-700 mb-4'>
                        <MdAlternateEmail className='text-gray-400' />
                        <input
                            type="email"
                            placeholder='Email Address'
                            className='bg-gray-700 text-white placeholder-gray-400 outline-none w-full'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-2 p-2 border border-gray-600 bg-gray-700 mb-4'>
                        <IoMdKey className='text-gray-400' />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='bg-gray-700 text-white placeholder-gray-400 outline-none w-full'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='text-gray-400 focus:outline-none'
                        >
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-blue-600 text-white py-2 mt-4 uppercase font-semibold hover:bg-blue-700 transition duration-300'
                    >
                        Login
                    </button>
                </form>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'>New here?</p>
                    <Link to='/register' className='text-sm font-thin text-blue-600 hover:underline cursor-pointer'>Register now</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;