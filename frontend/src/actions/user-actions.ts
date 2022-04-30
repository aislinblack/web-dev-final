import { UserInfo } from 'os';
import { stringify } from 'querystring';
import { Dispatch } from 'redux';
import { AppDispatch } from '../App';
import {
  findLoggedInUser,
  login,
  signup,
  updateUser,
} from '../services/user-service';
import { User } from '../types/user';

export const SIGN_IN = 'SIGN_IN';
export const REFRESHING = 'REFRESHING';
export const NOT_REFRESHING = 'NOT_REFRESHING';
export const UPDATE_USER = 'UPDATE_USER';

export type UserActions =
  | { type: 'SIGN_IN'; user: User }
  | { type: 'REFRESHING' }
  | { type: 'NOT_REFRESHING' }
  | { type: 'UPDATE_USER'; user: User };

export const signIn = async (
  dispatch: Dispatch,
  args: { email: string; password: string }
) => {
  const result = await login(args);
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

export const findUser = async (dispatch: Dispatch) => {
  dispatch({ type: REFRESHING });
  const result = await findLoggedInUser();

  if (result) {
    return dispatch({ type: SIGN_IN, user: result });
  }
  return dispatch({ type: NOT_REFRESHING });
};

export const updateCritic = async (
  dispatch: Dispatch,
  user: User,
  {
    firstName,
    lastName,
    organization,
  }: { firstName: string; lastName: string; organization: string }
) => {
  if (user.role !== 'critic') {
    return console.error('Cannot update non critic');
  }
  const updated: User = {
    ...user,
    firstName,
    lastName,
    criticProfile: { organization },
  };

  await updateUser(updated);

  dispatch({ type: UPDATE_USER, user: updated });
};

export const updateAuthor = async (
  dispatch: AppDispatch,
  user: User,
  {
    firstName,
    lastName,
    inspirations,
  }: { firstName: string; lastName: string; inspirations: string[] }
) => {
  if (user.role !== 'author') {
    return console.error('Cannot update non author');
  }

  const updated: User = {
    ...user,
    firstName,
    lastName,
    authorProfile: { inspirations },
  };
  await updateUser(updated);
  dispatch({ type: UPDATE_USER, user: updated });
};
