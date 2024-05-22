import axios from "axios";
import { call, put, takeLatest, all } from "redux-saga/effects";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import {
  FETCH_ALL_BANNERS,
  FETCH_BANNERS_SUCCESS,
  FETCH_BANNERS_FAILED,
} from "../actions/actions";

const cookies = new Cookies();
const fetchUsingAxios = (url) => {
  return axios.get(url);
};

function* fetchAllBanners() {
  try {
    const posts = yield call(
      fetchUsingAxios,
      `${BASE_URL}/store/api/v1/banners?from=0&limit=30`
    );
    yield put({ type: FETCH_BANNERS_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: FETCH_BANNERS_FAILED, error: e.message });
  }
}

function* allBanners() {
  yield all([takeLatest(FETCH_ALL_BANNERS, fetchAllBanners)]);
}

export default allBanners;
