import { Dispatch } from 'redux';
import { login, signup } from '../services/user-service';
import { User } from '../types/user';

export const SIGN_IN = 'SIGN_IN';

export type UserActions = { type: 'SIGN_IN'; user: User };

export const signIn = async (
  dispatch: Dispatch,
  args: { email: string; password: string }
) => {
  const result = await login(args);
  console.log(result);
  dispatch({ type: SIGN_IN, user: result.user });
  return result.user;
};

export const signUp = async (
  dispatch: Dispatch,
  args: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'author' | 'reader' | 'critic';
  }
) => {
  const result = await signup(args);

  dispatch({ type: SIGN_IN, user: result });
  return result.user;
};
