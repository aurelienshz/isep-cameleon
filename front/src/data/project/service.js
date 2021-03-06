// @flow

import { getJson, postJson, deleteJson, uploadFile } from '../../services/helpers/request';
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

export type MeetingDTO = {
  // TODO
}

export type Meeting = {
  // TODO
}

export type DeliverableDTO = {
  // TODO
}

export type Deliverable = {
  // TODO
}

export async function getProjectsList(): Promise<Array<Project>> {
  return await getJson(REQUEST_PATH_PREFIX);
}

export async function getMyProject(): Promise<Project> {
  return await getJson(REQUEST_PATH_PREFIX + "/my-project");
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

export async function createMeeting(id: number, meetingDTO: MeetingDTO): Promise<Meeting> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${id}/meeting`, meetingDTO);
}

export async function updateMeeting(projectId: number, meetingId: number, meetingDTO: MeetingDTO): Promise<Meeting> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${projectId}/meeting/${meetingId}`, meetingDTO);
}

export async function deleteMeeting(projectId: number, meetingId: number): Promise<void> {
  return await deleteJson(`${REQUEST_PATH_PREFIX}/${projectId}/meeting/${meetingId}`);
}

export async function uploadMeetingReport(projectId: number, meetingId: number, file: File) {
  return await uploadFile(`${REQUEST_PATH_PREFIX}/${projectId}/meeting/${meetingId}/report`, file);
}


export async function createDeliverable(id: number, deliverableDTO: DeliverableDTO): Promise<Deliverable> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${id}/deliverable`, deliverableDTO);
}

export async function updateDeliverable(projectId: number, deliverableId: number, deliverableDTO: DeliverableDTO): Promise<Deliverable> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${projectId}/deliverable/${deliverableId}`, deliverableDTO);
}

export async function deleteDeliverable(projectId: number, deliverableId: number): Promise<void> {
  return await deleteJson(`${REQUEST_PATH_PREFIX}/${projectId}/deliverable/${deliverableId}`);
}

export async function deliverDeliverable(projectId: number, deliverableId: number, file: File) {
  return await uploadFile(`${REQUEST_PATH_PREFIX}/${projectId}/deliverable/${deliverableId}/deliver`, file);
}

export async function sendMessage(projectId: number, dto): Promise<any> {
  return await postJson(`${REQUEST_PATH_PREFIX}/${projectId}/message`, dto);
}
