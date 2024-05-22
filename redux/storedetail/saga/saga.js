import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import Cookies from "universal-cookie";
import {
  FETCH_ALL_STORE,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILED,
} from "../actions/actions";
import BASE_URL from "../../../constants/textUtility/textenv";
const cookies = new Cookies();
const fetchUsingAxios = (url, payload = null) => {
  return axios.get(url);
};
// tes
function* fetchAllStore() {
  try {
    const posts = yield call(fetchUsingAxios, `${BASE_URL}/store/cms/store`);
    yield put({ type: FETCH_STORE_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: FETCH_STORE_FAILED, error: e.message });
  }
}

function* allStoreSaga() {
  yield all([takeLatest(FETCH_ALL_STORE, fetchAllStore)]);
}

export default allStoreSaga;
