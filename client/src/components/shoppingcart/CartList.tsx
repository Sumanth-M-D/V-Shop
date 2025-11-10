import CartListItem from "./CartListItem";
import CartListHeader from "./CartListHeader";
import { useAppSelector } from "../../hooks/redux";
import { CartItem } from "../../types/cart.types";

function CartList() {
  const { cartProducts } = useAppSelector((state) => state.shoppingCart);
  return (
    <div>
      <CartListHeader />
      <div className="flex flex-col gap-5">
        {cartProducts.map((product: CartItem) => (
          <CartListItem product={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
}

export default CartList;
