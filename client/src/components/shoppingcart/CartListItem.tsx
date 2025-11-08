import ProductQuantity from "../general/ProductQuantity";
import {
  removeProduct,
  updateProductQuantity,
} from "../../features/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { CartItem } from "../../types/cart.types";

interface CartListItemProps {
  product: CartItem;
}

function CartListItem({ product }: CartListItemProps) {
  const {
    product: { productId, title, image, price },
    quantity,
  } = product;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function updateQuantity(newQuantity: number) {
    if (newQuantity <= 0) return;
    dispatch(updateProductQuantity({ productId, quantity: newQuantity }));
  }

  function handleRemove() {
    dispatch(removeProduct(productId));
  }

  return (
    <div className="flex gap-2 justify-between pb-3 mb-3 border-b border-secondary--shade__0">
      <div
        className="listItem__title cursor-pointer"
        onClick={() => navigate(`/products/${productId}`)}
      >
        <div className="w-8 h-8 xs:w-14 xs:h-14 mr-3 bg-secondary flex-0">
          <img src={image?.[0]} className="w-full h-full p-1 object-contain" />
        </div>
        <h2 className="text-xs xs:text-sm flex-1">{title}</h2>
      </div>

      {/* Section for price, quantity, total price, and remove button */}
      <div className="flex items-center text-xs xs:text-sm">
        <p className="listItem__detail ">${price}</p>
        <span className="listItem__detail w-16 xs:w-20">
          <ProductQuantity
            quantity={quantity}
            updateQuantity={updateQuantity}
          />
        </span>

        <p className="listItem__detail ">
          ${Math.ceil(price * quantity * 100) / 100}
        </p>
        <button
          className="w-5 text-secondary--shade__0 text-sm"
          onClick={handleRemove}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default CartListItem;
