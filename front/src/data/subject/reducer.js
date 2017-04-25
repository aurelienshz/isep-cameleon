// @flow

const initialState = {
  loadedSubjects: null,
  loading: false,
};

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }

};

export const getLocalState = (state) => {
  return state.subject;
};
