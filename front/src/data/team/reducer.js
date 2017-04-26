// @flow

import { getTeamsList, createTeam as requestTeamCreation } from './service';

const initialState = {
  loading: false,
  teams: [],
};

// Actions types
const REQUEST_TEAMS = 'team/REQUEST_TEAMS';
const RECEIVE_TEAMS = 'team/RECEIVE_TEAMS';
const REQUEST_TEAM_CREATION = 'team/REQUEST_TEAM_CREATION';
const CONFIRM_TEAM_CREATION = 'team/CONFIRM_TEAM_CREATION';

// Reducers
export default function equipesReducer(state = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_TEAMS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_TEAMS:
      return {
        ...state,
        teams: action.teams,
        loading: false,
      };
    case REQUEST_TEAM_CREATION:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_TEAM_CREATION:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function fetchTeams() {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_TEAMS,
    });
    const teams = await getTeamsList();
    dispatch({
      type: RECEIVE_TEAMS,
      teams,
    });
  };
}

export function createTeam(teamCreationRequest) {
  return async(dispatch) => {
    dispatch({
      type: REQUEST_TEAM_CREATION,
    });
    try {
      const team = requestTeamCreation(teamCreationRequest);
      dispatch({
        type: CONFIRM_TEAM_CREATION,
      });
      dispatch(fetchTeams());
    } catch(err) {
      console.error(err); // TODO error management
    }
  }
}

export const getLocalState = (state) => {
  return state.team;
};
