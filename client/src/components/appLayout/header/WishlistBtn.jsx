import { FaRegHeart } from "react-icons/fa";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function WishlistBtn() {
  const navigate = useNavigate();

  // Access authentication status and wishlist products from Redux store
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { wishlistProducts } = useSelector((state) => state.wishlist);

  // Function to handle click events for the wishlist button
  function handleClick() {
    if (isAuthenticated) {
      navigate("/wishlist"); // Navigate to wishlist page if the user is authenticated
    } else {
      toast("User needs to sign in first");
      navigate("authentication"); // Navigate to authentication page if the user is not authenticated
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
