import { getCurrentPromotionStatus } from './service';

const REQUEST_PROMOTION_STATUS = "REQUEST_PROMOTION_STATUS";
const RECEIVE_PROMOTION_STATUS = "RECEIVE_PROMOTION_STATUS";

const initialState = {
  promotionStatus: null,
  selectedPromotion: "NOT_IMPLEMENTED",
  loading: false,
};

export const getLocalState = (state) => state.promotion;

export default function promotionReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROMOTION_STATUS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_PROMOTION_STATUS:
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
  return async (dispatch) => {
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
