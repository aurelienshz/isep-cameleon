import { getJson, postJson, deleteJson } from '../../services/helpers/request';

export async function getCurrentPromotionStatus() {
  return await getJson("/promotion/current-status");
}
