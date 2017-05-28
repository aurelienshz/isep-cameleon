import urljoin from 'url-join';

import { API_URL } from '../services/helpers/request';
import { getToken } from './users/service';

export function buildDownloadUrl(document) {
  const token = getToken();
  return urljoin(API_URL, "/document/download", document.path, "?token=" + token);
}
