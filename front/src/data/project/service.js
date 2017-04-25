// @flow

import { getJson, postJson, deleteJson } from '../../services/helpers/request';

const REQUEST_PATH_PREFIX = '/project';

export type Project = {
  name: string,
  description: string,
  number: number,
};

export async function getProjectsList(): Array<Project> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function getProject(id: number): Project {
  return await getJson(REQUEST_PATH_PREFIX + `${id}`);
}

export async function createProject(subject: Project): Project {
  return await postJson(REQUEST_PATH_PREFIX, subject);
}

export async function updateProject(id: number, subject: Project): Project {
  return await postJson(REQUEST_PATH_PREFIX + `/${id}`, subject);
}

export async function deleteProject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `${id}`);
}
