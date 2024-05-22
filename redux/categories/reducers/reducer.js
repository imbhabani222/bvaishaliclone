import {
  FETCH_ALL_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const listData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_CATEGORIES_FAILED:
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
export default listData;
