import React, { useState } from 'react';
import Login from '../components/Login'; 
import Register from '../components/Register'; 

const SignUp = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {isLogin ? <Login /> : <Register />}
            <button onClick={toggleForm}>
                {isLogin ? 'Go to Register' : 'Go to Login'}
            </button>
        </div>
    );
};

export default SignUp;