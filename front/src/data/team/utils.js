// @flow

import { getLocalState as getUsersState } from '../users/reducer';
import { getLocalState as getTeamState } from '../team/reducer';

export function isPartOfTeam(state) {
  const userState = getUsersState(state);
  const teamState = getTeamState(state);

  if (!userState.profile) return null;

  const userId = userState.profile.id;
  const team = teamState.teams.find(team => {
    // try to find connected user in team :
    const userIsMember = team.members.find(m => m.id === userId);
    // keep this team if connected user is part of it :
    return Boolean(userIsMember);
  });
  console.log(team);
  return team || null;
}
