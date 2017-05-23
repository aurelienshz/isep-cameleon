import { requestToken, isAuthenticated } from './data/users/service';
import fetch from 'isomorphic-fetch';

import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from './data/users/service';

const createLocalStorageMock = () => {
  const storage = {};
  const ls = {};

  ls.getItem = (key) => storage[key];
  ls.setItem = (key, value) => storage[key] = value;
  ls.removeItem = (key) => delete storage[key];
  return ls;
};

global.localStorage = createLocalStorageMock();

global.authenticate = () => {
  return requestToken({login: 'user', password: 'password'}).then(
    (response) => {
      localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.access_token);
      console.log("Authenticated successfully");
    }
  ).catch(
    (er) => {
      console.error(er);
    }
  );
};

global.fetch = fetch;
