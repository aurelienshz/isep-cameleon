// @flow

import { requestToken, getProfile, ACCESS_TOKEN_LOCALSTORAGE_KEY } from './auth';
import { push } from 'react-router-redux';

const REQUEST_AUTH_TOKEN = 'users/REQUEST_AUTH_TOKEN';
const RECEIVE_AUTH_TOKEN = 'users/RECEIVE_AUTH_TOKEN';
const REQUEST_PROFILE = 'users/REQUEST_PROFILE';
const RECEIVE_PROFILE = 'users/RECEIVE_PROFILE';
const LOGOUT = 'users/LOGOUT';
const UNKNOWN_ERROR_LOGIN = 'users/UNKNOWN_ERROR_LOGIN';

export type UsersState = {
  awaitingToken: boolean,
  awaitingProfile: boolean,
  accessToken: ?string,
  error: ?any,
};

type Action = {
  type: string,
  [string]: any,
};

const initialState = {
  awaitingToken: false,
  awaitingProfile: false,
  accessToken: null,
  profile: null,
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
    case REQUEST_PROFILE:
      return {
        ...state,
        awaitingProfile: true,
      };
    case RECEIVE_PROFILE:
      return {
        awaitingProfile: false,
        profile: action.profile,
      }
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
}

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_PROFILE
    });

    try {
      const profile = await getProfile();
      dispatch({
        type: RECEIVE_PROFILE,
        profile,
      })
    } catch(er) {
      console.error(er); // TODO
    }
  }
};

export const submitLoginAction = (credentials: {login: string, password: string}) => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: REQUEST_AUTH_TOKEN,
      });
      const authResponse = await requestToken(credentials);
      if (authResponse.token) {
        const accessToken = authResponse.token;

        dispatch({
          type: RECEIVE_AUTH_TOKEN,
          accessToken,
        });

        localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);

        dispatch(fetchProfile());
        dispatch(push("/teacher"));
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

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });

    localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

    dispatch(push('/login'));
  }
};

// Maps to the mounting location of this reducer in the global state store
// Useful for refactoring, because, when used everywhere we need this slice of state, it allows us
// to move the reducer without having to update everywhere the state is used.
export const getLocalState = (state: Object): UsersState => {
  return state.users;
};
