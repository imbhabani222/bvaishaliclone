import { all, fork } from "redux-saga/effects";
import allCategoriesSaga from "./categories/saga/saga";
import allProductsSaga from "./products/saga/saga";
import allStoreSaga from "./storedetail/saga/saga";
import allCartSaga from "./cartProducts/saga/saga";
import allWishListSaga from "./wishlistProducts/saga/saga";
import allAddress from "./address/saga/saga";
import allSettings from "./settings/saga/saga";
import allBanners from "./banners/saga/saga";
export function* rootSaga() {
  yield all([fork(allCategoriesSaga)]);
  yield all([fork(allProductsSaga)]);
  yield all([fork(allStoreSaga)]);
  yield all([fork(allCartSaga)]);
  yield all([fork(allWishListSaga)]);
  yield all([fork(allAddress)]);
  yield all([fork(allSettings)]);
  yield all([fork(allBanners)]);
}
