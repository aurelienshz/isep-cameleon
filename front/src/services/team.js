// @flow

import { getJson, postJson, deleteJson } from './helpers/request';

const REQUEST_PATH_PREFIX = '/team';

export type TeamCreationDTO = {
  name: string,
  membersIds: Array<number>,
}

export type Team = {
  name: string,
  members: Array<Object>, // TODO
  group: Object, // TODO
}

export async function createTeam(teamCreationDTO: TeamCreationDTO) {
  return await postJson(REQUEST_PATH_PREFIX, teamCreationDTO);
}

export async function getTeam(id: number): Team {
  return await getJson(REQUEST_PATH_PREFIX + `/${id}`);
}

export async function deleteTeam(id: number) {
  return await deleteJson(REQUEST_PATH_PREFIX + `/${id}`);
}
