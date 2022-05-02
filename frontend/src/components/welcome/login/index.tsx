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
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (userInfo.loggedIn) {
      navigate('/home');
    }
  }, [navigate, userInfo.loggedIn]);

  const logIn = () => {
    setLoading(true);
    setError(undefined);
    signIn(dispatch, { email, password })
      .then((result) => {
        if (result.loggedIn) {
          navigate('/home');
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setEmail('');
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <div className='wd-center'>
      <h3>Login</h3>
      <form className='form-floating mb-2'>
        <input
          className='form-control'
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor='email'>Email</label>
      </form>
      <form className='form-floating mb-2'>
        <input
          className='form-control'
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor='password'>Password</label>
      </form>
      <button
        className='btn btn-primary rounded-pill'
        disabled={loading}
        onClick={() => logIn()}
      >
        {loading ? <i className='fas fa-spinner fa-pulse fa-3x' /> : 'Login'}
      </button>
      {error && (
        <div className='text-danger mt-2'>
          <b>{error}</b>
        </div>
      )}
    </div>
  );
};

export default Login;
