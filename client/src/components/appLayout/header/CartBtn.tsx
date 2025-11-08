import { FiShoppingCart } from "react-icons/fi";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateActiveCategory } from "../../../features/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

function CartBtn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authentication);
  const { cartProducts } = useAppSelector((state) => state.shoppingCart);

  function handleClick() {
    dispatch(updateActiveCategory(""));
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
