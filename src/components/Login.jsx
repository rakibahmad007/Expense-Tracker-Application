import React, { useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { IoMdKey } from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (!email || !password) {
            toast.error('Required fields')
        } else {
            // Handle login logic here
        }
    }

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className='bg-gray-800 px-16 py-12 max-w-[1100px] w-full md:w-1/2 lg:w-1/3'>
                <h2 className='text-3xl font-semibold text-left uppercase text-white mb-4'>Login</h2>
                <h3 className='text-3xl text-left text-gray-400 uppercase mb-2'>Already registered?</h3>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'> Login if already our beloved user!</p>
                    <p className='text-sm font-thin text-red-600'></p>
                </div>
                <div className='flex items-center gap-2 p-2 border border-gray-600 bg-gray-700 mb-4'>
                    <MdAlternateEmail className='text-gray-400' />
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-gray-700 text-white placeholder-gray-400 outline-none'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-2 p-2 border border-gray-600 bg-gray-700 mb-4'>
                    <IoMdKey className='text-gray-400' />
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-gray-700 text-white placeholder-gray-400 outline-none'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className='w-full bg-blue-600 text-white py-2 mt-4 uppercase font-semibold hover:bg-blue-700 transition duration-300'
                >
                    Login
                </button>
                <div className='flex justify-between w-[100%] mb-4'>
                    <p className='text-sm font-thin text-gray-400'>New here?</p>
                    <a href='/register' className='text-sm font-thin text-blue-600 hover:underline'>Register now</a>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login