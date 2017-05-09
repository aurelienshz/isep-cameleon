import { getJson, postJson, deleteJson } from '../../services/helpers/request';

export async function getCurrentPromotionStatus() {
  return await getJson("/promotion/current-status");
}

export async function requestStartProjects() {
  return await postJson("/promotion/start-projects");
}

export async function requestEndProjects() {
  return await postJson("/promotion/end-projects");
}
