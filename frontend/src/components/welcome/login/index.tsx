import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signIn } from '../../../actions/user-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.userInfo);

  useEffect(() => {
    if (userInfo.loggedIn) {
      navigate('/home');
    }
  }, [navigate, userInfo.loggedIn]);

  const logIn = () => {
    setLoading(true);
    signIn(dispatch, { email, password }).then((result) => {
      if (result.loggedIn) {
        navigate('/home');
      }
      setEmail('');
      setPassword('');
      setLoading(false);
    });
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
