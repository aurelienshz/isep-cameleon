// @flow

import { getJson, postJson, deleteJson } from '../../services/helpers/request';
import type { Subject } from '../subject/service';

const REQUEST_PATH_PREFIX = '/project';

export type ProjectCreationDTO = {
  subjectId: number,
  teamId: number,
}

export type Project = {
  subject: Subject,
  team: Object, // TODO
  clients: Array<Object>, // TODO
}

export async function getProjectsList(): Promise<Array<Project>> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function getProject(id: number): Promise<Project> {
  return await getJson(REQUEST_PATH_PREFIX + `/${id}`);
}

export async function createProject(projectCreationDTO: ProjectCreationDTO): Promise<Project> {
  return await postJson(REQUEST_PATH_PREFIX, projectCreationDTO);
}

export async function updateProject(id: number, subject: Project): Promise<Project> {
  return await postJson(REQUEST_PATH_PREFIX + `/${id}`, subject);
}

export async function deleteProject(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `/${id}`);
}
