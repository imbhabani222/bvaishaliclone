import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import {
  FETCH_ALL_ADDRESS,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILED,
} from "../actions/actions";

const cookies = new Cookies();
const fetchUsingAxios = (url) => {
  return axios.get(url);
};

function* fetchAllAddres() {
  if (cookies?.get("accessToken")) {
    try {
      const posts = yield call(
        fetchUsingAxios,
        `${BASE_URL}/store/api/v1/address?from=0&limit=40`
      );
      yield put({ type: FETCH_ADDRESS_SUCCESS, result: posts });
    } catch (e) {
      yield put({ type: FETCH_ADDRESS_FAILED, error: e.message });
    }
  }
}

function* allAddress() {
  yield all([takeLatest(FETCH_ALL_ADDRESS, fetchAllAddres)]);
}

export default allAddress;
