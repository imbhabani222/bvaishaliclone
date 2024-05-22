import { combineReducers } from "redux";
import {
  FETCH_ALL_STORE,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const storeList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_STORE:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_STORE_FAILED:
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
export default storeList;
