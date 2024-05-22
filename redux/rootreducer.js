import { combineReducers } from "redux";
import allCategories from "./categories/reducers/reducer";
import allProducts from "./products/reducers/reducer";
import allStore from "./storedetail/reducers/reducer";
import {
  wishlistProductsList,
  fetchProductFromWishlist,
  removeWishlistProduct,
} from "./wishlistProducts/reducers/reducer";
import {
  cartProductsList,
  UpdateCartProduct,
  RemoveCartProduct,
} from "./cartProducts/reducers/reducer";
import allAddress from "./address/reducers/reducer";
import settingData from "./settings/reducers/reducer";
import bannersList from "./banners/reducers/reducer";

const rootReducer = combineReducers({
  allCategories: allCategories,
  allProducts: allProducts,
  allStore: allStore,
  wishlistProductsList: wishlistProductsList,
  fetchProductFromWishlist: fetchProductFromWishlist,
  removeWishlistProduct: removeWishlistProduct,
  allCart: cartProductsList,
  updateCartProduct: UpdateCartProduct,
  removeCartItem: RemoveCartProduct,
  allAddress: allAddress,
  settingData: settingData,
  bannersList: bannersList,
});

export default rootReducer;
