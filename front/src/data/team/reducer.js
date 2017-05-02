// @flow

import {
  getTeamsList,
  createTeam as requestTeamCreation,
  leaveTeam as requestTeamLeave,
  joinTeam as requestTeamJoin } from './service';

const initialState = {
  loading: false,
  teams: [],
};

// Actions types
const REQUEST_TEAMS = 'team/REQUEST_TEAMS';
const RECEIVE_TEAMS = 'team/RECEIVE_TEAMS';
const REQUEST_TEAM_CREATION = 'team/REQUEST_TEAM_CREATION';
const CONFIRM_TEAM_CREATION = 'team/CONFIRM_TEAM_CREATION';

const REQUEST_TEAM_LEAVE = 'team/REQUEST_TEAM_LEAVE';
const CONFIRM_TEAM_LEAVE = 'team/CONFIRM_TEAM_LEAVE';

const REQUEST_TEAM_JOIN = 'team/REQUEST_TEAM_JOIN';
const CONFIRM_TEAM_JOIN = 'team/CONFIRM_TEAM_JOIN';

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
        loading: false,
        teams: action.teams,
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
    case REQUEST_TEAM_LEAVE:
    case REQUEST_TEAM_JOIN:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_TEAM_LEAVE:
    case CONFIRM_TEAM_JOIN:
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
      await requestTeamCreation(teamCreationRequest);
      dispatch({
        type: CONFIRM_TEAM_CREATION,
      });
      dispatch(fetchTeams());
    } catch(err) {
      console.error(err); // TODO error management
    }
  }
};

export function leaveTeam(id) {
  return async(dispatch) => {
    dispatch({
      type: REQUEST_TEAM_LEAVE,
    });
    try {
      await requestTeamLeave(id);
      dispatch({
        type: CONFIRM_TEAM_LEAVE,
      });
      dispatch(fetchTeams());
    } catch(err) {
      console.error(err); // TODO error management
    }
  }
}

export function joinTeam(id) {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_TEAM_JOIN,
    });

    try {
      await requestTeamJoin(id);
      dispatch({
        type: CONFIRM_TEAM_JOIN,
      });
      dispatch(fetchTeams());
    } catch (err) {
      console.error(err);
    }
  }
}

export const getLocalState = (state) => {
  return state.team;
};
