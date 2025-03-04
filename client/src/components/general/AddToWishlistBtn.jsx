import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addProductToWishlist } from "../../features/wishlistSlice";
import { toast } from "react-toastify";

function AddToWishlistBtn({ product }) {
  // Redux state and dispatch hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the isAuthenticated state from the Redux store
  const { isAuthenticated } = useSelector((state) => state.authentication);

  // Function to handle adding the product to the wishlist
  function handleAddtoWishlist() {
    if (isAuthenticated) {
      dispatch(addProductToWishlist(product));
      toast("Item has been added to wishlist");
    } else {
      toast("User needs to sign in first");
      navigate("/authentication");
    }
  }

  return (
    <button className="cta" onClick={handleAddtoWishlist}>
      <FaRegHeart />
      <span> Add to wishList</span>
    </button>
  );
}

export default AddToWishlistBtn;
