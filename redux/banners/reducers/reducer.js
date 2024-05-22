import { combineReducers } from "redux";
import {
  FETCH_ALL_BANNERS,
  FETCH_BANNERS_SUCCESS,
  FETCH_BANNERS_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const bannersList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BANNERS:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_BANNERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_BANNERS_FAILED:
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
export default bannersList;
