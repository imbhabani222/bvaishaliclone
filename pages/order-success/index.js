import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "../../componentss/OrderSuccess";
import { FETCH_ALL_CART_PRODUCTS } from "../../redux/cartProducts/actions/actions";

const OrderSuccessComp = () => {
  const router = useRouter();
  const id = Object.keys(router?.query);
  let orderId = id?.join(",");
  const dispatch = useDispatch();
  const cartId = useSelector((s) => s.allStore?.result?.cart?.id);
  const storeData = useSelector((s) => s.allStore);

  useEffect(() => {
    dispatch({
      type: FETCH_ALL_CART_PRODUCTS,
      cartId: cartId,
    });
  }, [cartId, dispatch, storeData?.fetching]);

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <OrderSuccess orderId={orderId} />
    </div>
  );
};

export default OrderSuccessComp;
