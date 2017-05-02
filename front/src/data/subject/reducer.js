// @flow

import { getSubjectsList } from './service';

const initialState = {
  subjects: null,
  loading: false,
};

const REQUEST_SUBJECTS = "REQUEST_SUBJECT";
const RECEIVE_SUBJECTS = "RECEIVE_SUBJECT";

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUBJECTS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_SUBJECTS:
      return {
        ...state,
        subjects: action.subjects,
        loading: false,
      };
    default:
      return state;
  }
};

export function fetchSubjects() {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_SUBJECTS,
    });
    try {
      const subjects = await getSubjectsList();
      dispatch({
        type: RECEIVE_SUBJECTS,
        subjects,
      });
    } catch(err) {
      console.error(err);
    }
  };
}

export const getLocalState = (state) => {
  return state.subject;
};
