import { getCurrentPromotionStatus, requestStartProjects, requestEndProjects } from './service';

const REQUEST_PROMOTION_STATUS = "promotion/REQUEST_PROMOTION_STATUS";
const RECEIVE_PROMOTION_STATUS = "promotion/RECEIVE_PROMOTION_STATUS";
const REQUEST_START_PROJECTS = "promotion/REQUEST_START_PROJECTS";
const CONFIRM_START_PROJECTS = "promotion/CONFIRM_START_PROJECTS";
const REQUEST_END_PROJECTS = "promotion/REQUEST_END_PROJECTS";
const CONFIRM_END_PROJECTS = "promotion/CONFIRM_END_PROJECTS";

const initialState = {
  promotionStatus: null,
  selectedPromotion: "NOT_IMPLEMENTED",
  loading: false,
};

export const getLocalState = (state) => state.promotion;

export default function promotionReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROMOTION_STATUS:
    case REQUEST_START_PROJECTS:
    case REQUEST_END_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_PROMOTION_STATUS:
    case CONFIRM_START_PROJECTS:
    case CONFIRM_END_PROJECTS:
      return {
        ...state,
        loading: false,
        promotionStatus: action.promotion.status,
      };
    default:
      return state;
  }
}

export const fetchPromotion = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_PROMOTION_STATUS,
    });

    try {
      const promotion = await getCurrentPromotionStatus();
      dispatch({
        type: RECEIVE_PROMOTION_STATUS,
        promotion,
      });
    } catch (er) {
      console.error(er);
    }
  };
};

export const startProjects = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_START_PROJECTS,
    });

    try {
      const promotion = await requestStartProjects();
      dispatch({
        type: CONFIRM_START_PROJECTS,
        promotion,
      });
    } catch (er) {
      console.error(er);
    }
  };
};

export const endProjects = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_END_PROJECTS,
    });

    try {
      const promotion = await requestEndProjects();
      dispatch({
        type: CONFIRM_END_PROJECTS,
        promotion,
      });
    } catch (er) {
      console.error(er);
    }
  };
};
