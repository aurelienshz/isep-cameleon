// @flow
import urljoin from 'url-join';
// import fetch from 'isomorphic-fetch';

import { API_URL } from '../../services/helpers/request';

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = "chameleon_access_token";

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY));
};

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
}

export function getToken() {
  if (isAuthenticated()) {
    return localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
  }
  return null;
}

// TODO aurelien don't export ACCESS_TOKEN_LOCALSTORAGE_KEY, use this function from the reducer :
export function setToken(token) {
  localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
}

export async function requestToken(credentials: {login: string, password: string}) {
  // TODO not here (export in config)
  const basicAuthString = btoa('chameleon:chameleonsecret'); // TODO change these
  const headers = {
    'Authorization': 'Basic ' + basicAuthString,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const options = {
    method: 'POST',
    headers,
  };

  const params = {
    grant_type: 'password',
    scope: 'write',
    username: credentials.login,
    password: credentials.password,
  };

  const tokenPath = '/oauth/token';
  let paramsString = '';

  Object.keys(params).forEach((paramKey, index) => {
    const delimiter = index === 0 ? "?" : "&";
    paramsString += delimiter + paramKey + '=' + params[paramKey];
  });

  const url = urljoin(API_URL, tokenPath, paramsString);

  const res = await fetch(url, options);

  if (!res.ok) {
    if (res.status === 401) {
      // Error is not critical : it's simply invalid credentials
      throw new Error('Identifiants invalides');
    } else {
      // Typecast Error to any to make it possible to attach more attributes
      const error: any = new Error(`${res.status} code when requesting ${res.url}`);
      try {
        error.json = await res.json();
      } catch (err) {
        // NOOP
      }
      throw error;
    }
  }

  return res.json();
}
