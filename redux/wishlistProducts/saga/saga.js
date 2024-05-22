import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "../../axios";
import {
  ADD_PRODUCTS_TO_WISHLIST,
  ADD_PRODUCTS_TO_WISHLIST_SUCCESS,
  ADD_PRODUCTS_TO_WISHLIST_FAILED,
  FETCH_PRODUCTS_FROM_WISHLIST,
  FETCH_PRODUCTS_FROM_WISHLIST_SUCCESS,
  FETCH_PRODUCTS_FROM_WISHLIST_FAILED,
  REMOVE_PRODUCT_FROM_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS,
  REMOVE_PRODUCT_FROM_WISHLIST_FAILED,
} from "../actions/actions";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
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

function* addWishlistProduct(action) {
  try {
    const posts = yield call(
      updateUsingAxios,
      `${BASE_URL}/store/cms/wishlist/${action.productId}`
    );
    yield put({ type: ADD_PRODUCTS_TO_WISHLIST_SUCCESS, result: posts });
    yield put({ type: FETCH_PRODUCTS_FROM_WISHLIST });
  } catch (e) {
    yield put({ type: ADD_PRODUCTS_TO_WISHLIST_FAILED, error: e.message });
  }
}
function* fetchWishlistProduct(action) {
  if (cookies?.get("accessToken")) {
    try {
      const posts = yield call(
        fetchUsingAxios,
        `${BASE_URL}/store/cms/wishlist`
      );
      yield put({ type: FETCH_PRODUCTS_FROM_WISHLIST_SUCCESS, result: posts });
      yield put({
        type: FETCH_PRODUCTS_FROM_WISHLIST_FAILED,
        error: e?.message || "error",
      });
    } catch (e) {}
  }
}
function* removeWishlistProduct(action) {
  try {
    const posts = yield call(
      removeUsingAxios,
      `${BASE_URL}/store/cms/wishlist/${action.productId}`
    );

    console.log("redux calling");

    yield put({ type: FETCH_PRODUCTS_FROM_WISHLIST });
    yield put({ type: REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS, result: posts });
  } catch (e) {
    yield put({ type: REMOVE_PRODUCT_FROM_WISHLIST_FAILED, error: e.message });
  }
}
// function* UpdateCartProduct(action) {
//   try {
//     const posts = yield call(
//       updateUsingAxios,
//       `${BASE_URL}/store/api/v2/create-cart`,
//       action.data
//     );
//     yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
//   } catch (e) {
//     yield put({ type: UPDATE_CART_PRODUCT_FAILED, error: e.message });
//   }
// }

// function* addCouponData(action) {
//   try {
//     const posts = yield call(
//       addCoupon,
//       `${BASE_URL}/store/api/v2/apply-coupon`,
//       action.data
//     );
//     yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
//   } catch (e) {
//     yield put({ type: COUPON_FAILURE, error: e.message });
//   }
// }

// function* removeCouponData(action) {
//   try {
//     const posts = yield call(
//       removeCoupon,
//       `${BASE_URL}/store/api/v2/remove-coupon`
//     );
//     yield put({ type: FETCH_CART_PRODUCTS_SUCCESS, result: posts });
//   } catch (e) {
//     yield put({ type: COUPON_FAILURE, error: e.message });
//   }
// }

function* allProductsSaga() {
  yield all([takeLatest(ADD_PRODUCTS_TO_WISHLIST, addWishlistProduct)]);
  yield all([takeLatest(FETCH_PRODUCTS_FROM_WISHLIST, fetchWishlistProduct)]);
  yield all([takeLatest(REMOVE_PRODUCT_FROM_WISHLIST, removeWishlistProduct)]);
  // yield all([takeLatest(UPDATE_CART_PRODUCT, UpdateCartProduct)]);

  // yield all([takeLatest(ADD_COUPON, addCouponData)]);
  // yield all([takeLatest(REMOVE_COUPON, removeCouponData)]);
}

export default allProductsSaga;
