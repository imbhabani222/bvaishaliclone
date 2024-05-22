import axios from "axios";
import { call, put, takeLatest, all } from "redux-saga/effects";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import {
    FETCH_ALL_RECENTS,
    FETCH_RECENTS_SUCCESS,
    FETCH_RECENTS_FAILED,
} from "../actions/actions";

const cookies = new Cookies();

const fetchUsingAxios = (url) => {
    return axios.get(url);
};

function* fetchAllRecents() {
    try {
        const posts = yield call(
            fetchUsingAxios,
            `${BASE_URL}/store/cms/products/recent?page=1&limit=10`
        );
        yield put({ type: FETCH_RECENTS_SUCCESS, result: posts });
    } catch (e) {
        yield put({ type: FETCH_RECENTS_FAILED, error: e.message });
    }
}

function* allRecents() {
    yield all([takeLatest(FETCH_ALL_RECENTS, fetchAllRecents)]);
}

export default allRecents;
