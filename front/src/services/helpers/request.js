// @flow

import urljoin from 'url-join';

import { isAuthenticated, getToken } from '../../data/users/service';

export const API_URL: string = process.env.REACT_APP_BACKEND_URL || '';

const attemptRequestOrThrow = async (method: string, url: string, body: ?Object) => {
  const options = {
    method,
    body: JSON.stringify(body),
    headers: {},
  };

  options.headers['Content-Type'] = 'application/json';

  // Handle authenticated requests :
  if (isAuthenticated()) {
    // Authorization using oAuth token :
    const token = getToken();
    // guard for flow
    if (token) {
      options.headers = options.headers || {};
      options.headers['authorization'] = `Bearer ${token}`;
    }
  }

  // $FlowFixMe https://github.com/facebook/flow/issues/2164
  const res = await fetch(urljoin(API_URL, url), options);

  if (!res.ok) {
    // Typecast to any to make it possible to attach more attributes
    const error: any = new Error(`${res.status} code when requesting ${res.url}`);
    try {
      error.json = await res.json();
    } catch (err) {
      // NOOP
    }
    throw error;
  }

  // Handle 204 No Content (the server accepted the request but has nothing to provide in response)
  if (res.status === 204) return true;

  return res.json();
};

export async function getJson(url: string): Promise<any> {
  return await attemptRequestOrThrow('GET', url);
}

export async function postJson(url: string, body: ?Object): Promise<any> {
  return await attemptRequestOrThrow('POST', url, body);
}

export async function deleteJson(url: string): Promise<any> {
  return await attemptRequestOrThrow('DELETE', url);
}
