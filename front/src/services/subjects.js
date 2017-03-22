// @flow

import { getJson, postJson, deleteJson } from './helpers/request';

const REQUEST_PATH_PREFIX = '/subject';

type Subject = {
  name: string,
  description: string,
  number: number,
};

export async function getSubjectsList(): Array<Subject> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function getSubject(id: number): Subject {
  return await getJson(REQUEST_PATH_PREFIX + `${id}`);
}

export async function createSubject(subject: Subject) {
  return await postJson(REQUEST_PATH_PREFIX, subject);
}

export async function updateSubject(id: number, subject: Subject) {
  return await postJson(REQUEST_PATH_PREFIX + `/${id}`, subject);
}

export async function deleteSubject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `${id}`);
}
