import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToCart } from "../../features/shoppingCartSlice";
import { AddToCartPayload } from "../../types/cart.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface AddToCartBtnProps {
  product: AddToCartPayload;
  extraClass?: string;
}

function AddtoCartBtn({ product, extraClass = "" }: AddToCartBtnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(
    (state) => state.authentication
  );

  function handleAddtoCart() {
    if (isAuthenticated) {
      dispatch(addProductToCart(product));
      toast("Item has been added to cart");
    } else {
      toast("User needs to sign in first");
      navigate("/authentication");
    }
  }

  return (
    <button className={`cta ${extraClass}`} onClick={handleAddtoCart}>
      <MdOutlineAddShoppingCart />
      <span>Add to Cart</span>
    </button>
  );
}

export default AddtoCartBtn;
