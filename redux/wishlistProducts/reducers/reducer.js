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
  // UPDATE_CART_PRODUCT,
  // UPDATE_CART_PRODUCT_SUCCESS,
  // UPDATE_CART_PRODUCT_FAILED,
  // COUPON_FAILURE,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

export const wishlistProductsList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS_TO_WISHLIST:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case ADD_PRODUCTS_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case ADD_PRODUCTS_TO_WISHLIST_FAILED:
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
export const fetchProductFromWishlist = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_FROM_WISHLIST:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_PRODUCTS_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_PRODUCTS_FROM_WISHLIST_FAILED:
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
export const removeWishlistProduct = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_FROM_WISHLIST:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case REMOVE_PRODUCT_FROM_WISHLIST_FAILED:
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
// export const UpdateCartProduct = (state = initialState, action) => {
//   switch (action.type) {
//     case COUPON_FAILURE:
//       return { ...state, fetching: false, result: null, error: action.error };
//     case UPDATE_CART_PRODUCT:
//       return {
//         ...state,
//         fetching: true,
//         result: null,
//         error: null,
//       };
//     case UPDATE_CART_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         fetching: false,
//         result: action?.result?.data,
//         error: null,
//       };

//     case UPDATE_CART_PRODUCT_FAILED:
//       return {
//         ...state,
//         fetching: false,
//         result: null,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };
