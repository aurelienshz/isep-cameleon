// @flow
import urljoin from 'url-join';

import { API_URL, getJson } from '../../services/helpers/request';

export const LOGIN_TYPE_EXTERNAL = "LOGIN_TYPE_EXTERNAL";
export const LOGIN_TYPE_LDAP = "LOGIN_TYPE_LDAP";

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = "chameleon_access_token";

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY));
};

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
}

export function getToken(): ?string {
  if (isAuthenticated()) {
    return localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
  }
  return null;
}

// TODO this is simpler now, we can use helpers/request.js
export async function requestToken({login, password}: {login: string, password: string}, loginType) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({ login, password });
  const options = {
    method: 'POST',
    headers,
    body,
  };

  const tokenPath = loginType === LOGIN_TYPE_EXTERNAL ? '/user/login' : '/user/ldap-login';

  const url = urljoin(API_URL, tokenPath);

  const res = await fetch(url, options);

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

export async function getProfile() {
  return await getJson('/user/me');
}

export async function getClients() {
  return await getJson("/user/client");
}
