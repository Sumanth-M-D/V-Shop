import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

import Ratings from "../general/Ratings";
import AddtoCartBtn from "../general/AddtoCartBtn";
import AddToWishlistBtn from "../general/AddToWishlistBtn";
import { Product } from "../../types/product.types";
import { AddToCartPayload, AddToWishlistPayload } from "../../types/cart.types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { category, productId, image, price, rating, title } = product;
  const navigate = useNavigate();
  const [isImageHovered, setIsImageHovered] = useState(false);

  const navigateToProductDetail = useCallback(() => {
    navigate(`/products/${productId}`);
  }, [productId, navigate]);

  const productToCart: AddToCartPayload = { productId, quantity: 1 };
  const productToWishlist: AddToWishlistPayload = { productId };

  const productImages = useMemo(() => {
    const [primary, secondary] = image ?? [];
    return {
      primary: primary ?? "",
      secondary: secondary ?? primary ?? "",
    };
  }, [image]);

  const productRating = rating ?? { rate: 0, count: 0 };

  return (
    <article className="group relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-secondary--shade__0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-secondary--shade__0/30"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        onClick={navigateToProductDetail}
        role="button"
        tabIndex={0}
        onKeyUp={(evt) => {
          if (evt.key === "Enter" || evt.key === " ") {
            navigateToProductDetail();
          }
        }}
      >
        <img
          src={isImageHovered ? productImages.secondary : productImages.primary}
          alt={title}
          className="h-full w-full max-w-[220px] scale-100 object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {productImages.secondary && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}

        <button
          type="button"
          className="absolute inset-x-6 bottom-6 flex items-center justify-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black group-hover:translate-y-0 group-hover:opacity-100"
          onClick={(evt) => {
            evt.stopPropagation();
            navigateToProductDetail();
          }}
        >
          <FiEye className="text-base" />
          Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-5 text-secondary--shade__2">
        <div className="flex flex-col gap-2 text-left">
          <span className="inline-flex w-fit items-center rounded-full bg-secondary--shade__0 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-secondary--shade__3">
            {category}
          </span>
          <button
            type="button"
            className="line-clamp-2 text-left text-sm font-semibold text-secondary transition-colors hover:text-primary--shade__1"
            onClick={navigateToProductDetail}
          >
            {title}
          </button>
          <p className="text-lg font-semibold text-primary--shade__1">
            {"$ " + price}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-secondary--shade__3">
            <div className="flex items-center gap-2">
              <Ratings rating={productRating} />
              <span>{productRating.rate.toFixed(1)}</span>
            </div>
            <span>{productRating.count} reviews</span>
          </div>

          <div className="flex flex-col gap-2">
            <AddtoCartBtn
              product={productToCart}
              extraClass="w-full justify-center gap-2"
            />
            <AddToWishlistBtn
              product={productToWishlist}
              extraClass="w-full justify-center gap-2"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
