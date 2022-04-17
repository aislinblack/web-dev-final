import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../services/user-service';
import '../index.css';

const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const signUp = useCallback(() => {
    signup({ firstName, lastName, email, password }).then((response) => {
      console.log(response);
      navigate('/home');
    });
  }, [firstName, lastName, email, password, navigate]);

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
