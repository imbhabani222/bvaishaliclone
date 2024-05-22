import { combineReducers } from "redux";
import {
    FETCH_ALL_RECENTS,
    FETCH_RECENTS_SUCCESS,
    FETCH_RECENTS_FAILED,
} from "../actions/actions";

const initialState = {
    fetching: false,
    result: null,
    error: null,
};

const recentsList = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_RECENTS:
            return {
                ...state,
                fetching: true,
                result: null,
                error: null,
            };
        case FETCH_RECENTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                result: action?.result?.data,
                error: null,
            };

        case FETCH_RECENTS_FAILED:
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
export default recentsList;
