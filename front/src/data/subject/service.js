// @flow

import { getJson, postJson, deleteJson } from '../../services/helpers/request';

const REQUEST_PATH_PREFIX = '/subject';

export type Subject = {
  name: string,
  description: string,
  number: number,
};

export async function getSubjectsList(): Promise<Array<Subject>> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function setSubjectClient(subjectId, clientId): Promise<true> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${subjectId}/client/${clientId}`);
}

export async function getSubject(id: number): Promise<Subject> {
  return await getJson(REQUEST_PATH_PREFIX + `${id}`);
}

export async function createSubject(subject: Subject): Promise<Subject> {
  return await postJson(REQUEST_PATH_PREFIX, subject);
}

export async function updateSubject(id: number, subject: Subject): Promise<Subject> {
  return await postJson(REQUEST_PATH_PREFIX + `/${id}`, subject);
}

export async function deleteSubject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `${id}`);
}

export async function updateFeatureCategory(subjectId, fcId, dto) {
  return await postJson(`${REQUEST_PATH_PREFIX}/${subjectId}/feature-category/${fcId}`, dto);
}
