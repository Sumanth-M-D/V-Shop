import { useNavigate } from "react-router-dom";
import Ratings from "../general/Ratings";
import AddtoCartBtn from "../general/AddtoCartBtn";
import AddToWishlistBtn from "../general/AddToWishlistBtn";
import { useCallback } from "react";
import { Product } from "../../types/product.types";
import {
  AddToCartPayload,
  AddToWishlistPayload,
} from "../../types/cart.types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { category, productId, image, price, rating, title } = product;
  const navigate = useNavigate();

  const navigateToProductDetail = useCallback(() => {
    navigate(`/products/${productId}`);
  }, [productId, navigate]);

  const productToCart: AddToCartPayload = { productId, quantity: 1 };
  const productToWishlist: AddToWishlistPayload = { productId };

  const productImage = image?.[0] ?? "";
  const productRating = rating ?? { rate: 0, count: 0 };

  return (
    <div className="w-60 xxxs:w-40 xs:w-60 borderSecondary hover:scale-105 duration-200 ">
      <div
        className="w-full h-60  flex items-end mb-2 border-b-2 border-secondary cursor-pointer shadow-sm duration-200 "
        onClick={navigateToProductDetail}
      >
        <img
          src={productImage}
          alt={title}
          className="object-contain h-full mx-auto px-3 py-8"
        />
      </div>

      <div className="text-center xs:h-72 h-80 flex flex-col justify-around px-4 pb-4 text-secondary--shade__2 ">
        <p className="capitalize text-secondary--shade__1 text-xs ">
          {category}
        </p>
        <p
          className="text-sm  hover:text-primary--shade__1 hover:font-bold cursor-pointer duration-200"
          onClick={navigateToProductDetail}
        >
          {title}
        </p>
        <p className="text-base text-primary--shade__1 font-semibold">
          {"$ " + price}
        </p>

        <div className="flex flex-col sm:flex-row gap-1  items-center justify-around pb-6">
          <Ratings rating={productRating} />
          <p className="text-xs sm:text-sm">
            {"( " + productRating.count + " Reviews )"}
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
