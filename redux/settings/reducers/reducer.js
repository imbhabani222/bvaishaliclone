import {
  FETCH_ALL_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILED,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const settingData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SETTINGS:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_SETTINGS_FAILED:
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
export default settingData;
