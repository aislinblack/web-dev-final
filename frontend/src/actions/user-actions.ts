import { UserInfo } from 'os';
import { stringify } from 'querystring';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AppDispatch } from '../App';
import {
  findLoggedInUser,
  login,
  logout,
  signup,
  updateUser,
} from '../services/user-service';
import { User } from '../types/user';

export const SIGN_IN = 'SIGN_IN';
export const REFRESHING = 'REFRESHING';
export const NOT_REFRESHING = 'NOT_REFRESHING';
export const UPDATE_USER = 'UPDATE_USER';
export const LOG_OUT = 'LOG_OUT';

export type UserActions =
  | { type: 'SIGN_IN'; user: User }
  | { type: 'REFRESHING' }
  | { type: 'NOT_REFRESHING' }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'LOG_OUT' };

export const signIn = async (
  dispatch: Dispatch,
  args: { email: string; password: string }
) => {
  const result = await login(args).then((res) => {
    if (res.status === 403) {
      throw new Error("User Info didn't match :(");
    }
    return res;
  });

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
    password,
    organization,
  }: {
    firstName: string;
    lastName: string;
    password?: string;
    organization: string;
  }
) => {
  if (user.role !== 'critic') {
    return console.error('Cannot update non critic');
  }
  const updated: User & { password?: string } = {
    ...user,
    firstName,
    lastName,
    password,
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
    password,
    inspirations,
  }: {
    firstName: string;
    lastName: string;
    password?: string;
    inspirations: string[];
  }
) => {
  if (user.role !== 'author') {
    return console.error('Cannot update non author');
  }

  const updated: User & { password?: string } = {
    ...user,
    firstName,
    lastName,
    password,
    authorProfile: { inspirations },
  };
  await updateUser(updated);
  dispatch({ type: UPDATE_USER, user: updated });
};

export const updateReader = async (
  dispatch: AppDispatch,
  user: User,
  {
    firstName,
    lastName,
    password,
    favoriteAuthor,
  }: {
    firstName: string;
    lastName: string;
    password?: string;
    favoriteAuthor?: string;
  }
) => {
  if (user.role !== 'reader') {
    return console.error('Cannot update non reader');
  }

  const updated: User & { password?: string } = {
    ...user,
    firstName,
    lastName,
    password,
    readerProfile: { favoriteAuthor },
  };

  await updateUser(updated);
  dispatch({ type: UPDATE_USER, user: updated });
};

export const logoutUser = async (dispatch: AppDispatch) => {
  await logout();

  dispatch({ type: 'LOG_OUT' });
};
