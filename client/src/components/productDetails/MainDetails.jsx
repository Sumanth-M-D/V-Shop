import { useDispatch, useSelector } from "react-redux";
import Ratings from "../general/Ratings";
import { FaTableList } from "react-icons/fa6";
import ProductQuantity from "../general/ProductQuantity";
import { updateProductQuantity } from "../../features/productDetailsSlice";
import AddtoCartBtn from "../general/AddtoCartBtn";
import AddToWishlistBtn from "../general/AddToWishlistBtn";
import AddToCompareBtn from "../general/AddToCompareBtn";
import SocialMedia from "../general/SocialMedia";

function MainDetails() {
  const { productData, quantity } = useSelector(
    (state) => state.productDetails
  );

  const dispatch = useDispatch();
  const { title, price, description, category, image, rating, productId } =
    productData;

  const showSize =
    category === "men's clothing" || category === "women's clothing";

  const productToCart = { productId, quantity };
  const productToWishlist = { productId };

  return (
    <div className="upperMd:grid upperMd:grid-cols-10  gap-3 py-6 text-black  ">
      <div className="upperMd:col-span-5 lg:col-span-4 h-[500px] upperMd:h-[725px] lg:h-[650px] xl:h-[550px] upperMd:mr-4">
        <img
          src={image?.[0]}
          alt={title}
          className="bg-secondary w-full h-full object-contain py-4 px-3"
        />
      </div>

      <div className="upperMd:col-span-5 lg:col-span-6 upperMd:h-full flex flex-col justify-between py-10 upperMd:py-0">
        <div className=" flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <div className="flex gap-3">
            <Ratings rating={rating} />
            <p>{`( ${rating.count} reviews )`}</p>
          </div>

          <div className="text-2xl text-primary--shade__1 font-semibold">
            ${price}
          </div>

          <div className="text-sm leading-6">
            <p>{description}</p>
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
          <p>Category: {category}</p>
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
