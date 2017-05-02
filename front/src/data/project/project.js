// @flow

import { getJson, postJson, deleteJson } from '../../services/helpers/request';
import type { Subject } from './subjects';

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

export async function createProject (projectCreationDTO: ProjectCreationDTO) {
  return await postJson(REQUEST_PATH_PREFIX, projectCreationDTO);
}

export async function getProject(id: number): Project {
  return await getJson(REQUEST_PATH_PREFIX + `/${id}`);
}

export async function deleteProject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `/${id}`);
}
