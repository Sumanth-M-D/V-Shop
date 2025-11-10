import { useCallback } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import CartListItem from "./CartListItem";
import CartListHeader from "./CartListHeader";
import { useAppSelector } from "../../hooks/redux";
import { CartItem } from "../../types/cart.types";
import EmptyState from "../general/EmptyState";

function CartList() {
  const { cartProducts } = useAppSelector((state) => state.shoppingCart);
  const navigate = useNavigate();

  const handleBrowseProducts = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (cartProducts.length === 0) {
    return (
      <div className="pt-10">
        <EmptyState
          icon={<FiShoppingBag />}
          title="Your cart is feeling light"
          subtitle="Start adding products you love and they will appear here for quick checkout."
          ctaLabel="Browse products"
          onAction={handleBrowseProducts}
        />
      </div>
    );
  }

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
