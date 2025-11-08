import { FaRegHeart } from "react-icons/fa";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateActiveCategory } from "../../../features/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

function WishlistBtn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authentication);
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);

  function handleClick() {
    dispatch(updateActiveCategory(""));
    if (isAuthenticated) {
      navigate("/wishlist");
    } else {
      toast("User needs to sign in first");
      navigate("authentication");
    }
  }

  return (
    <button
      className="flex flex-col items-center px-2 relative hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative">
        <FaRegHeart className="text-2xl" />
        <Badge number={wishlistProducts.length} />
      </div>
      <p className="text-[10px]">Wishlist</p>
    </button>
  );
}

export default WishlistBtn;
