import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";
import CartListHeader from "./CartListHeader";

function CartList() {
  const { cartProducts } = useSelector((state) => state.shoppingCart);
  return (
    <div>
      <CartListHeader />
      <div className="flex flex-col gap-5">
        {cartProducts.map((product) => (
          <CartListItem product={product} key={product.product.productId} />
        ))}
      </div>
    </div>
  );
}

export default CartList;
