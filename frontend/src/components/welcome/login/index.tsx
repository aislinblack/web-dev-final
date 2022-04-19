import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/user-service';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logIn = () => {
    setLoading(true);
    login({ email, password })
      .then(() => {
        navigate('/home');
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className='wd-center'>
      <h3>Login</h3>
      <p>
        Email:
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </p>
      <p>
        Password:
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <button disabled={loading} onClick={() => logIn()}>
        {loading ? <i className='fas fa-spinner fa-pulse fa-3x' /> : 'Login'}
      </button>
    </div>
  );
};

export default Login;
