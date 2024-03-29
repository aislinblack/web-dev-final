import {
  SIGN_IN,
  UserActions,
  REFRESHING,
  NOT_REFRESHING,
  UPDATE_USER,
  LOG_OUT,
} from '../actions/user-actions';
import { User } from '../types/user';

type userInfoType =
  | { loggedIn: false; refreshing: boolean }
  | { loggedIn: true; user: User };

const userReducer = (
  state: userInfoType = { loggedIn: false, refreshing: true },
  action: UserActions
): userInfoType => {
  switch (action.type) {
    case SIGN_IN:
      return { loggedIn: true, user: action.user };
    case UPDATE_USER:
      return { loggedIn: true, user: action.user };
    case REFRESHING:
      return { loggedIn: false, refreshing: true };
    case NOT_REFRESHING:
      return { loggedIn: false, refreshing: false };
    case LOG_OUT:
      return { loggedIn: false, refreshing: false };
    default:
      return state;
  }
};

export default userReducer;
