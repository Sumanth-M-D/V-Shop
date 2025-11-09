import { useState, useEffect } from "react";
import Ratings from "../general/Ratings";
import { FaTableList } from "react-icons/fa6";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import ProductQuantity from "../general/ProductQuantity";
import { updateProductQuantity } from "../../features/productDetailsSlice";
import AddtoCartBtn from "../general/AddtoCartBtn";
import AddToWishlistBtn from "../general/AddToWishlistBtn";
import AddToCompareBtn from "../general/AddToCompareBtn";
import SocialMedia from "../general/SocialMedia";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AddToCartPayload, AddToWishlistPayload } from "../../types/cart.types";
import { Rating } from "../../types/product.types";

function MainDetails() {
  const { productData, quantity } = useAppSelector(
    (state) => state.productDetails
  );

  const dispatch = useAppDispatch();
  const {
    title,
    price,
    description,
    category,
    image,
    rating,
    productId,
  } = productData;

  const productTitle = title ?? "Product";
  const productPrice = price ?? 0;
  const productDescription = description ?? "";
  const productCategory = category ?? "";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [productId]);

  const showSize =
    productCategory === "menClothing" || productCategory === "womenClothing";

  const safeProductId = productId ?? "";
  const productToCart: AddToCartPayload = {
    productId: safeProductId,
    quantity,
  };
  const productToWishlist: AddToWishlistPayload = { productId: safeProductId };

  const images = Array.isArray(image) ? image : [];
  const hasMultipleImages = images.length > 1;
  const productRating: Rating = rating ?? { rate: 0, count: 0 };
  const currentImage = images[currentImageIndex] ?? "";

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="upperMd:grid upperMd:grid-cols-10  gap-3 py-6 text-black mb-8 ">
      <div className="upperMd:col-span-5 lg:col-span-4 h-[500px] upperMd:h-[725px] lg:h-[650px] xl:h-[550px] upperMd:mr-4">
        <div className="relative w-full h-full bg-secondary">
          <img
            src={currentImage}
            alt={`${productTitle} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain py-4 px-3"
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous image"
              >
                <MdChevronLeft className="text-2xl text-secondary--shade__2" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next image"
              >
                <MdChevronRight className="text-2xl text-secondary--shade__2" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-primary w-6"
                        : "bg-secondary--shade__1 hover:bg-secondary--shade__2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded transition-all ${
                  index === currentImageIndex
                    ? "border-primary"
                    : "border-secondary--shade__0 hover:border-secondary--shade__2"
                }`}
              >
                <img
                  src={img}
                  alt={`${productTitle} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="upperMd:col-span-5 lg:col-span-6 upperMd:h-full flex flex-col justify-between py-10 upperMd:py-0">
        <div className=" flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{productTitle}</h1>

          <div className="flex gap-3">
            <Ratings rating={productRating} />
            <p>{`( ${productRating.count} reviews )`}</p>
          </div>

          <div className="text-2xl text-primary--shade__1 font-semibold">
            ${productPrice}
          </div>

          <div className="text-sm leading-6">
            <p>{productDescription}</p>
          </div>

          {showSize && (
            <div className="flex gap-6 items-center ">
              <p>Size</p>
              <select className="text-sm w-28 border-[1px] border-secondary--shade__1 px-3 py-1 focus:outline-none">
                <option>Select size</option>
                <option>2xl</option>
                <option>xl</option>
                <option>l</option>
                <option>md</option>
                <option>sm</option>
              </select>

              <button className="flex gap-2 items-center text-sm">
                <FaTableList /> <span> Size guide</span>
              </button>
            </div>
          )}

          <div className="flex gap-6">
            <p className="pr-[3px]">Qty</p>
            <div className="w-28">
              <ProductQuantity
                updateQuantity={(qty) => {
                  dispatch(updateProductQuantity(qty));
                }}
                quantity={quantity}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 lg:gap-8 py-2">
            <span className="w-[150px]">
              <AddtoCartBtn product={productToCart} />
            </span>
            <span className="w-[150px]">
              <AddToWishlistBtn product={productToWishlist} />
            </span>
            <span className="w-[150px]">
              <AddToCompareBtn />
            </span>
          </div>
        </div>
        <div className=" flex justify-between text-sm border-t-[1px] border-secondary--shade__0 pt-2 mt-2">
          <p>Category: {productCategory}</p>
          <div className="flex gap-3 items-center ">
            <p>Share</p>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDetails;
