import { useNavigate } from "react-router-dom";
import Ratings from "../general/Ratings";
import AddtoCartBtn from "../general/AddtoCartBtn";
import AddToWishlistBtn from "../general/AddToWishlistBtn";

function ProductCard({ product }) {
  // Destructure product properties for easier access
  const { category, id, image, price, rating, title } = product;
  const navigate = useNavigate();

  // Function to navigate to the product details page
  function navigateTOProductDetail() {
    navigate(`/products/${id}`);
  }

  // Prepare product data for cart and wishlist
  const productToCart = { productId: id, quantity: 1 };
  const productToWishlist = { productId: id };

  return (
    <div className="w-60 xxxs:w-40 xs:w-60 borderSecondary hover:scale-105 duration-200 ">
      <div
        className="w-full h-60  flex items-end mb-2 border-b-2 border-secondary cursor-pointer shadow-sm duration-200 "
        onClick={navigateTOProductDetail}
      >
        <img src={image} className="object-contain h-full mx-auto px-3 py-8" />
      </div>

      <div className="text-center xs:h-72 h-80 flex flex-col justify-around px-4 pb-4 text-secondary--shade__2 ">
        <p className="capitalize text-secondary--shade__1 text-xs ">
          {category}
        </p>
        <p
          className="text-sm  hover:text-primary--shade__1 hover:font-bold cursor-pointer duration-200"
          onClick={navigateTOProductDetail}
        >
          {title}
        </p>
        <p className="text-base text-primary--shade__1 font-semibold">
          {"$ " + price}
        </p>

        <div className="flex flex-col sm:flex-row gap-1  items-center justify-around pb-6">
          <Ratings rating={rating} />
          <p className="text-xs sm:text-sm">
            {"( " + rating.count + " Reviews )"}
          </p>
        </div>

        <div className=" flex flex-col gap-2 justify-self-end ">
          <AddtoCartBtn product={productToCart} />
          <AddToWishlistBtn product={productToWishlist} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
