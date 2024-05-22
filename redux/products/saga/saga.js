import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "./../../axios";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
} from "../actions/actions";
import BASE_URL from "../../../constants/textUtility/textenv";

const fetchUsingAxios = (url, payload = null) => {
  return axios.get(url, payload);
};

function* fetchAllProducts() {
  try {
    const posts = yield call(fetchUsingAxios, `${BASE_URL}/store/cms/products`);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: FETCH_PRODUCTS_FAILED, error: e.message });
  }
}

function* allProductsSaga() {
  yield all([takeLatest(FETCH_ALL_PRODUCTS, fetchAllProducts)]);
}

export default allProductsSaga;
