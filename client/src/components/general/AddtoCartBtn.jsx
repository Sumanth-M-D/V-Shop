import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../features/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddtoCartBtn({ product, extraClass }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);

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
