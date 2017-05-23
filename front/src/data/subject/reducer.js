// @flow

import {
  getSubjectsList,
  setSubjectClient as setSubjectClientService,
  createSubject as requestSubjectCreation,
  updateFeatureCategory as updateFeatureCategoryService,
  createFeature as createFeatureService,
  deleteFeature as deleteFeatureService
} from './service';

const initialState = {
  subjects: [],
  loading: false,
};

const REQUEST_SUBJECTS = "subject/REQUEST_SUBJECT";
const REQUEST_SUBJECTS_AFTER_OPTIMISTIC_UPDATE = "subject/REQUEST_SUBJECTS_AFTER_OPTIMISTIC_UPDATE";
const RECEIVE_SUBJECTS = "subject/RECEIVE_SUBJECT";
const REQUEST_SUBJECT_CREATION = "subject/REQUEST_SUBJECT_CREATION";
const CONFIRM_SUBJECT_CREATION = "subject/CONFIRM_SUBJECT_CREATION";
const REQUEST_SET_SUBJECT_CLIENT = "subject/REQUEST_SET_SUBJECT_CLIENT";
const CONFIRM_SET_SUBJECT_CLIENT = "subject/CONFIRM_SET_SUBJECT_CLIENT";
const REQUEST_UPDATE_FEATURE_CATEGORY = "subject/REQUEST_UPDATE_FEATURE_CATEGORY";
const CONFIRM_UPDATE_FEATURE_CATEGORY = "subject/CONFIRM_UPDATE_FEATURE_CATEGORY";
const REQUEST_CREATE_FEATURE = "subject/REQUEST_CREATE_FEATURE";
const CONFIRM_CREATE_FEATURE = "subject/CONFIRM_CREATE_FEATURE";
const REQUEST_DELETE_FEATURE = "subject/REQUEST_DELETE_FEATURE";

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUBJECTS:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_SUBJECTS_AFTER_OPTIMISTIC_UPDATE:
      return {
        ...state,
      };
    case RECEIVE_SUBJECTS:
      return {
        ...state,
        subjects: action.subjects,
        loading: false,
      };
    case REQUEST_SET_SUBJECT_CLIENT:
    case REQUEST_SUBJECT_CREATION:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_SET_SUBJECT_CLIENT:
    case CONFIRM_SUBJECT_CREATION:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_CREATE_FEATURE:
      return {
        ...state,
      };
    case REQUEST_UPDATE_FEATURE_CATEGORY:
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

export function fetchSubjectsAfterOptimisticUpdate() {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_SUBJECTS_AFTER_OPTIMISTIC_UPDATE,
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
  return async(dispatch: Function) => {
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
}


export function setSubjectClient(subjectId, clientId) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_SET_SUBJECT_CLIENT,
    });
    try {
      await setSubjectClientService(subjectId, clientId);
      dispatch({
        type: CONFIRM_SET_SUBJECT_CLIENT,
      });
      dispatch(fetchSubjects());
    } catch (er) {
      console.error(er);
    }
  }
}

export function updateFeatureCategory(subjectId, fcId, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_UPDATE_FEATURE_CATEGORY,
    });
    try {
      await updateFeatureCategoryService(subjectId, fcId, dto);
      dispatch({
        type: CONFIRM_UPDATE_FEATURE_CATEGORY,
      });
      dispatch(fetchSubjectsAfterOptimisticUpdate());
    } catch (er) {
      console.error(er);
    }
  }
}

export function createFeature(subjectId, fcId, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_CREATE_FEATURE,
    });
    try {
      await createFeatureService(subjectId, fcId, dto);
      dispatch({
        type: CONFIRM_CREATE_FEATURE,
      });
      dispatch(fetchSubjectsAfterOptimisticUpdate());
    } catch (er) {
      console.error(er);
    }
  }
}

export function deleteFeature(subjectId, featureId) {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_DELETE_FEATURE,
    });
    try {
      await deleteFeatureService(subjectId, featureId);
      dispatch(fetchSubjectsAfterOptimisticUpdate());
    } catch(er) {
      console.error(er);
    }
  }
}

export const getLocalState = (state) => {
  return state.subject;
};
