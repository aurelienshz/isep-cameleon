// @flow

import { getSubjectsList, createSubject as requestSubjectCreation } from './service';

const initialState = {
  subjects: [],
  loading: false,
};

const REQUEST_SUBJECTS = "REQUEST_SUBJECT";
const RECEIVE_SUBJECTS = "RECEIVE_SUBJECT";
const REQUEST_SUBJECT_CREATION = "REQUEST_SUBJECT_CREATION";
const CONFIRM_SUBJECT_CREATION = "CONFIRM_SUBJECT_CREATION";

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
    case REQUEST_SUBJECT_CREATION:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_SUBJECT_CREATION:
      return {
        ...state,
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

export function createSubject(subjectCreationRequest) {
  return async(dispatch) => {
    dispatch({
      type: REQUEST_SUBJECT_CREATION,
    });
    try {
      await requestSubjectCreation(subjectCreationRequest);
      dispatch({
        type: CONFIRM_SUBJECT_CREATION,
      });
      dispatch(fetchSubjects());
    } catch(err) {
      console.error(err); // TODO error management
    }
  }
};


export const getLocalState = (state) => {
  return state.subject;
};
