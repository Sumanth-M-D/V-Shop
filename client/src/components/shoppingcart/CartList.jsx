import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";
import CartListHeader from "./CartListHeader";

function CartList() {
  // Get state variables from redux store
  const { cartProducts } = useSelector((state) => state.shoppingCart);
  return (
    <div>
      <CartListHeader />
      <div className="flex flex-col gap-5">
        {/* Map through 'cartProducts' and render each product */}
        {cartProducts.map((product) => (
          <CartListItem product={product} key={product.product.id} />
        ))}
      </div>
    </div>
  );
}

export default CartList;
