import { useState } from 'react';
import '../index.css';

const Login = () => {
  return (
    <div className='wd-center'>
      <h3>Login</h3>
      <p>
        Email: <input />
      </p>
      <p>
        Password: <input />
      </p>
      <button>Login</button>
    </div>
  );
};

export default Login;
