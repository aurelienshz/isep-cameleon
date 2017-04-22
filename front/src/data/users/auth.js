// @flow
import urljoin from 'url-join';

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
  const headers = new Headers();
  // TODO not here (export in config)
  const basicAuthString = btoa('acme:acmesecret'); // TODO change these
  headers.set('Authorization', 'Basic ' + basicAuthString);
  headers.set('Content-Type', 'application/x-www-form-urlencoded');

  const options = {
    method: 'POST',
    headers,
  };

  const url = '/oauth/token';

  // TODO export URL in config, be resilient against other URLs (CORS)
  const postUrl = new URL(urljoin(API_URL, url)); // eslint-disable-line no-undef
  const params = {
    grant_type: 'password',
    scope: 'openid',
    username: credentials.login,
    password: credentials.password,
  };

  // TODO this is impossible to test because Node has a bad URL implementation
  Object.keys(params).forEach((key) => { postUrl.searchParams.append(key, params[key]); });

  const res = await fetch(postUrl.toString(), options);

  if (!res.ok) {
    if (res.status === 400) {
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
