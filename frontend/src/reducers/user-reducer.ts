import { SIGN_IN, UserActions } from '../actions/user-actions';
import { User } from '../types/user';

type userInfoType = { loggedIn: false } | { loggedIn: true; user: User };

const userReducer = (
  state: userInfoType = { loggedIn: false },
  action: UserActions
) => {
  switch (action.type) {
    case SIGN_IN:
      return { loggedIn: true, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
