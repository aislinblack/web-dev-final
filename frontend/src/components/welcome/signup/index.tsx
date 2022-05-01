import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../actions/user-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import '../index.css';

const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'author' | 'reader' | 'critic'>('reader');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((store) => store.userInfo);

  useEffect(() => {
    if (userInfo.loggedIn) {
      navigate('/home');
    }
  }, [navigate, userInfo.loggedIn]);

  const signup = useCallback(() => {
    signUp(dispatch, { firstName, lastName, email, password, role });
  }, [dispatch, firstName, lastName, email, password, role]);

  return (
    <div className='wd-center'>
      <h3>Signup</h3>
      <form className='form-floating mb-2'>
        <input
          className='form-control'
          id='firstName'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor='firstName'>First Name</label>
      </form>
      <form className='form-floating mb-2'>
        <input
          className='form-control'
          id='lastName'
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor='lastName'>Last Name</label>
      </form>
      <form className='form-floating mb-2'>
        <select
          className='form-control'
          value={role}
          onChange={(event) => {
            if (
              event.target.value !== 'reader' &&
              event.target.value !== 'author' &&
              event.target.value !== 'critic'
            ) {
              throw new Error('How??');
            }
            setRole(event.target.value);
          }}
        >
          <option value='reader'>Reader</option>
          <option value='author'>Author</option>
          <option value='critic'>Critic</option>
        </select>
        <label htmlFor='role'>Role</label>
      </form>
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
      <button className='btn btn-primary rounded-pill' onClick={() => signup()}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
