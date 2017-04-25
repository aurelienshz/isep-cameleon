import * as equipesService from '../../services/equipesService';

const initialState = {
  loading: false,
  filter: 'validate',
  equipes: [],
};

// Actions types
const REQUEST_EQUIPES = 'equipes/REQUEST_EQUIPES';
const RECEIVE_EQUIPES = 'equipes/RECEIVE_EQUIPES';
const FILTER_EQUIPES = 'equipes/FILTER_EQUIPES';

// Reducers
export default function equipesReducer(state = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_EQUIPES:
      return {
        ...state,
        filter: initialState.filter,
        loading: true,
      };
    case RECEIVE_EQUIPES:
      return {
        ...state,
        equipes: action.equipes,
        loading: false,
      };
    case FILTER_EQUIPES:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

// Actions dispatcher
export function fetchEquipes() {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_EQUIPES,
    });
    const equipes = await equipesService.getEquipes();
    dispatch({
      type: RECEIVE_EQUIPES,
      equipes,
    });
  };
}

export function filterEquipes(filter) {
  return dispatch => dispatch({
    type: FILTER_EQUIPES,
    filter,
  });
}

export function selectEquipesStatus(state) {
  return state.equipes.filter(s => s.status === state.filter);
}
