import { FiShoppingCart } from "react-icons/fi";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateActiveCategory } from "../../../features/categoriesSlice";

function CartBtn() {
  const navigate = useNavigate(); // Initialize the navigate hook for navigation
  const dispatch = useDispatch();

  // Get the required data from redux store
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { cartProducts } = useSelector((state) => state.shoppingCart);

  // Function to handle the button click event
  function handleClick() {
    dispatch(updateActiveCategory(""));
    // Navigate to the cart page if the user is authenticated; otherwise, navigate to the authentication page
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      toast("User needs to sign in first");
      navigate("authentication");
    }
  }

  return (
    <button
      className="flex flex-col items-center px-2 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative">
        <FiShoppingCart className="text-2xl" />
        <Badge number={cartProducts.length} />
      </div>
      <p className="text-[10px]">Cart</p>
    </button>
  );
}

export default CartBtn;
