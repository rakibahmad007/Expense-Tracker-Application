import React, { useState } from 'react'
import axios from 'axios'
import { MdAlternateEmail } from 'react-icons/md'
import { IoMdKey, IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !username || !password || !confirmPassword) {
            toast.error('Required fields');
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    navigate('/dashboard'); // Redirect to dashboard or main page
                } else {
                    toast.error('Registration failed: No token received');
                }
            } catch (error) {
                toast.error('Registration failed: ' + error.message);
            }
        }
    };

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className='bg-gray-800 px-16 py-12 max-w-[1100px] w-full md:w-1/2 lg:w-1/3'>
                <h2 className='text-3xl font-semibold text-left uppercase text-white mb-4'>Register</h2>
                <h3 className='text-3xl text-left text-gray-400 uppercase mb-2'>New here?</h3>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'> Register to become our beloved user!</p>
                </div>
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
                    <input
                        type="text"
                        placeholder='Username'
                        className='bg-gray-700 text-white placeholder-gray-400 outline-none w-full'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'>
                        {showPassword ? <IoMdEyeOff className='text-gray-400' /> : <IoMdEye className='text-gray-400' />}
                    </div>
                </div>
                <div className='flex items-center gap-2 p-2 border border-gray-600 bg-gray-700 mb-4'>
                    <IoMdKey className='text-gray-400' />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        className='bg-gray-700 text-white placeholder-gray-400 outline-none w-full'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'>
                        {showPassword ? <IoMdEyeOff className='text-gray-400' /> : <IoMdEye className='text-gray-400' />}
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    className='w-full bg-blue-600 text-white py-2 mt-4 uppercase font-semibold hover:bg-blue-700 transition duration-300'
                >
                    Register
                </button>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'>Already registered?</p>
                    <Link to='/login' className='text-sm font-thin text-blue-600 hover:underline cursor-pointer'>Login now</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Register
