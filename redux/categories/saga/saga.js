import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import {
  FETCH_ALL_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
} from "../actions/actions";
import BASE_URL from "../../../constants/textUtility/textenv";

const fetchUsingAxios = (url, payload = null) => {
  return axios.get(url, payload);
};

function* fetchAllCategories() {
  try {
    const posts = yield call(
      fetchUsingAxios,
      `${BASE_URL}/store/cms/categories`
    );
    yield put({ type: FETCH_CATEGORIES_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: FETCH_CATEGORIES_FAILED, error: e.message });
  }
}

function* allCategoriesSaga() {
  yield all([takeLatest(FETCH_ALL_CATEGORIES, fetchAllCategories)]);
}

export default allCategoriesSaga;
