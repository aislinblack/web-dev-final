import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../services/user-service';
import '../index.css';

const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'author' | 'reader' | 'critic'>('reader');
  const navigate = useNavigate();

  const signUp = useCallback(() => {
    signup({ firstName, lastName, email, password, role }).then((response) => {
      navigate('/home');
    });
  }, [firstName, lastName, email, password, role, navigate]);

  return (
    <div className='wd-center'>
      <h3>Signup</h3>
      <p>
        First Name:
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </p>
      <p>
        Last Name:
        <input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </p>
      <p>
        Role:
        <select
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
      </p>
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
          value={password}
          type='password'
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <button onClick={() => signUp()}>Signup</button>
    </div>
  );
};

export default Signup;