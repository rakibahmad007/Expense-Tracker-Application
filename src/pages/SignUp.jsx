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
            <a href="#" onClick={toggleForm}>
                {isLogin ? 'Go to Register' : 'Go to Login'}
            </a>
        </div>
    );
};

export default SignUp;