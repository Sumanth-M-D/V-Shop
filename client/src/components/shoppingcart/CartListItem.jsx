import { useDispatch } from "react-redux";
import ProductQuantity from "../general/ProductQuantity";
import {
  removeProduct,
  updateProductQuantity,
} from "../../features/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CartListItem({ product }) {
  const {
    product: { id, title, image, price },
    quantity,
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to update the quantity of the product in the cart
  function updateQuantity(quantity) {
    dispatch(updateProductQuantity({ productId: id, quantity }));
  }

  // Function to remove the product from the cart
  function handleRemove() {
    dispatch(removeProduct(id));
  }

  return (
    <div className="flex gap-2 justify-between pb-3 mb-3 border-b border-secondary--shade__0">
      {/* Product image and title with responsive sizes */}
      <div
        className="listItem__title cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
      >
        <div className="w-8 h-8 xs:w-14 xs:h-14 mr-3 bg-secondary flex-0">
          <img src={image} className="w-full h-full p-1 object-contain" />
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
