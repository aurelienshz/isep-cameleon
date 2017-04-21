// @flow
import { requestToken } from './auth';

const REQUEST_AUTH_TOKEN = 'users/REQUEST_AUTH_TOKEN';
const RECEIVE_AUTH_TOKEN = 'users/RECEIVE_AUTH_TOKEN';
const UNKNOWN_ERROR_LOGIN = 'users/UNKNOWN_ERROR_LOGIN';

export type UsersState = {
  awaitingToken: boolean,
  accessToken: ?string,
  error: ?any,
};

type Action = {
  type: string,
  [string]: any,
};

const initialState = {
  awaitingToken: false,
  accessToken: null,
  error: null,
};

export default function servicesReducer(state: UsersState = initialState, action: Action): UsersState {
  switch (action.type) {
    case REQUEST_AUTH_TOKEN:
      return {
        ...state,
        awaitingToken: true,
        error: null,
      };
    case RECEIVE_AUTH_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        awaitingToken: false,
      };
    case UNKNOWN_ERROR_LOGIN:
      return {
        ...state,
        awaitingToken: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const submitLoginAction = (credentials: {login: string, password: string}) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: REQUEST_AUTH_TOKEN,
      });
      const authResponse = await requestToken(credentials);
      if (authResponse.access_token) {
        const accessToken = authResponse.access_token;

        // store token in localStorage :
        localStorage.setItem('access_token', accessToken);

        dispatch({
          type: RECEIVE_AUTH_TOKEN,
          accessToken,
        });
      } else {
        throw new Error('No access token in auth server response');
      }
    } catch (err) {
      dispatch({
        type: UNKNOWN_ERROR_LOGIN,
        error: err,
      });
    }
  };
};

// Maps to the mounting location of this reducer in the global state store
// Useful for refactoring, because, when used everywhere we need this slice of state, it allows us
// to move the reducer without having to update everywhere the state is used.
export const getLocalState = (state: Object): UsersState => {
  return state.users;
};
