import { combineReducers } from "redux";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const productsList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_PRODUCTS_FAILED:
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
export default productsList;
