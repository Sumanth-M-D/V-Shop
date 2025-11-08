import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToWishlist } from "../../features/wishlistSlice";
import { AddToWishlistPayload } from "../../types/cart.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface AddToWishlistBtnProps {
  product: AddToWishlistPayload;
}

function AddToWishlistBtn({ product }: AddToWishlistBtnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(
    (state) => state.authentication
  );

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
