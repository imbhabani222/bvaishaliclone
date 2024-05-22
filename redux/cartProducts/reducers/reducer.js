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
  COUPON_FAILURE,
} from "../actions/actions";

const initialState = {
  fetching: false,
  result: null,
  error: null,
};

export const cartProductsList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CART_PRODUCTS:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case FETCH_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case FETCH_CART_PRODUCTS_FAILED:
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
export const RemoveCartProduct = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_CART_PRODUCT:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case REMOVE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case REMOVE_CART_PRODUCT_FAILED:
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
export const UpdateCartProduct = (state = initialState, action) => {
  switch (action.type) {
    case COUPON_FAILURE:
      return { ...state, fetching: false, result: null, error: action.error };
    case UPDATE_CART_PRODUCT:
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case UPDATE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        result: action?.result?.data,
        error: null,
      };

    case UPDATE_CART_PRODUCT_FAILED:
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
