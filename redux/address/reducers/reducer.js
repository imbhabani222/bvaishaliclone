import { combineReducers } from "redux";
import {
  FETCH_ALL_ADDRESS,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const addressList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ADDRESS:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_ADDRESS_FAILED:
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
export default addressList;
