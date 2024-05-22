import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import {
  FETCH_ALL_CART_PRODUCTS,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_FAILED,
  UPDATE_CART_PRODUCT,
  UPDATE_CART_PRODUCT_SUCCESS,
  UPDATE_CART_PRODUCT_FAILED,
  REMOVE_CART_PRODUCT,
  REMOVE_CART_PRODUCT_SUCCESS,
  REMOVE_CART_PRODUCT_FAILED,
  ADD_COUPON,
  REMOVE_COUPON,
  COUPON_FAILURE,
} from "../actions/actions";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import { message } from "antd";
const cookies = new Cookies();

const fetchUsingAxios = (url, payload = null) => {
  return axios.get(url);
};
const removeUsingAxios = (url, payload = null) => {
  return axios.delete(url, payload);
};

const updateUsingAxios = (url, payload = null) => {
  return axios.post(url, payload);
};

const addCoupon = (url, payload = null) => {
  return axios.post(url, payload);
};

const removeCoupon = (url) => {
  return axios.get(url);
};

function* fetchAllCartProduct(action) {
  console.log("actionuiuiui", action);
  if (action.cartId || localStorage.getItem("cartId")) {
    try {
      const posts = yield call(
        fetchUsingAxios,
        `${BASE_URL}/store/api/v2/cart/${action.cartId ?? localStorage.getItem("cartId")
        }?pm=${action?.pm?.length > 0 ? action?.pm : "ONLINE"}`
        // }${action?.pm ? `${"pm=" + action?.pm}` : ""}`
      );

      yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
    } catch (e) {
      yield put({ type: FETCH_CART_PRODUCTS_FAILED, error: e.message });
    }
  }
}
function* UpdateCartProduct(action) {
  console.log("action1212", action);
  try {
    const posts = yield call(
      updateUsingAxios,
      `${BASE_URL}/store/api/v2/create-cart`,
      action.data
    );
    yield put({
      type: FETCH_ALL_CART_PRODUCTS,
      cartId: cookies?.get("accessToken") ? posts?.data?.id : null,
      pm: action?.pm,
    });
    yield put({
      type: FETCH_CART_PRODUCTS_SUCCESS,
      result: posts,
    });
    console.log("posts?.data?.id", posts?.data?.id);

    if (!localStorage.getItem("cartId") && !cookies?.get("accessToken")) {
      localStorage.setItem("cartId", posts?.data?.id);
    }
  } catch (e) {
    message.warning(e?.response?.data?.message || e.message);
    yield put({ type: UPDATE_CART_PRODUCT_FAILED, error: e.message });
  }
}

function* addCouponData(action) {
  try {
    const posts = yield call(
      addCoupon,
      `${BASE_URL}/store/api/v2/apply-coupon?pm=${action?.pm}`,
      JSON.parse(
        JSON.stringify({
          couponId: action.data?.couponId,
          couponCode: action.data?.couponCode,
        })
      )
    );
    yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: COUPON_FAILURE, error: e.message });
  }
}

function* removeCouponData(action) {
  try {
    const posts = yield call(
      removeCoupon,
      `${BASE_URL}/store/api/v2/remove-coupon?pm=${action?.pm}`
    );
    yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: COUPON_FAILURE, error: e.message });
  }
}

function* removeCartProduct(action) {
  try {
    const posts = yield call(
      removeUsingAxios,
      `${BASE_URL}/store/api/v1/lineitems/${action.lineitemId}`
    );

    yield put({ type: FETCH_ALL_CART_PRODUCTS, cartId: action.cartId });
    yield put({ type: REMOVE_CART_PRODUCT_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: REMOVE_CART_PRODUCT_FAILED, error: e.message });
  }
}

function* allProductsSaga() {
  yield all([takeLatest(FETCH_ALL_CART_PRODUCTS, fetchAllCartProduct)]);
  yield all([takeLatest(UPDATE_CART_PRODUCT, UpdateCartProduct)]);
  yield all([takeLatest(REMOVE_CART_PRODUCT, removeCartProduct)]);
  yield all([takeLatest(ADD_COUPON, addCouponData)]);
  yield all([takeLatest(REMOVE_COUPON, removeCouponData)]);
}

export default allProductsSaga;
