import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import {
  FETCH_ALL_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILED,
} from "../actions/actions";

const cookies = new Cookies();
const fetchUsingAxios = (url) => {
  return axios.get(url, {
    headers: { authorization: `bearer ${cookies.get("accessToken")}` },
  });
};

function* fetchSettings() {
  try {
    const posts = yield call(fetchUsingAxios, `${BASE_URL}/store/cms/settings`);
    yield put({ type: FETCH_SETTINGS_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: FETCH_SETTINGS_FAILED, error: e.message });
  }
}

function* allSettings() {
  yield all([takeLatest(FETCH_ALL_SETTINGS, fetchSettings)]);
}

export default allSettings;
