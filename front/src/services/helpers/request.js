// @flow

import 'whatwg-fetch'
import urljoin from 'url-join';

export const API_URL = process.env.REACT_APP_BACKEND_URL;

type RequestOptions = {
  method: string,
  body?: ?Object,
  headers: Headers,
  mode?: string,
  cache?: string,
};

const attemptRequestOrThrow = async (method: string, url: string, body: ?Object) => {
  const options: RequestOptions = {
    method,
    body,
    headers: new Headers(),
  };

  // Handle authenticated requests :
  // if (/* there is an authentication token */) {
  //   // Authorization using oAuth token :
  //   options.headers.set('Authorization', `Bearer ${servicesState.accessToken}`);
  // }

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
