import { getTeamsList } from './service';

const initialState = {
  loading: false,
  teams: [],
};

// Actions types
const REQUEST_TEAMS = 'team/REQUEST_TEAMS';
const RECEIVE_TEAMS = 'team/RECEIVE_TEAMS';

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

export const getLocalState = (state) => {
  return state.team;
};
