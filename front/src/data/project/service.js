// @flow

import { getJson, postJson, deleteJson } from '../../services/helpers/request';
import type { Subject } from '../subject/service';

const REQUEST_PATH_PREFIX = '/project';

export type ProjectCreationDTO = {
  subjectId: number,
  teamId: number,
  clientsIds: Array<number>,
}

export type Project = {
  subject: Subject,
  team: Object, // TODO
  clients: Array<Object>, // TODO
}

export async function getProjectsList(): Array<Project> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function getProject(id: number): Project {
  return await getJson(REQUEST_PATH_PREFIX + `/${id}`);
}

export async function createProject(subject: Project): Project {
  return await postJson(REQUEST_PATH_PREFIX, subject);
}

export async function updateProject(id: number, subject: Project): Project {
  return await postJson(REQUEST_PATH_PREFIX + `/${id}`, subject);
}

export async function deleteProject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `/${id}`);
}
