import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../features/wishlistSlice";
import AddtoCartBtn from "../general/AddtoCartBtn";

function ListItem({ product }) {
  const { productId, title, image, price } = product.product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProduct = { productId, quantity: 1 };

  function handleRemove() {
    dispatch(removeProduct(productId));
  }

  return (
    <div className="flex gap-2 justify-between pb-3 mb-3 border-b border-secondary--shade__0 ">
      <div
        className="listItem__title cursor-pointer"
        onClick={() => navigate(`/products/${productId}`)}
      >
        <div className="w-8 h-8 xs:w-14 xs:h-14 mr-3 bg-secondary flex-0">
          <img src={image?.[0]} className="w-full h-full p-1 object-contain" />
        </div>
        <h2 className=" flex-1 text-[10px] [435px]:text-xs sm:text-sm">
          {title}
        </h2>
      </div>

      {/* Product price, stock availability and Button to remove the product  */}
      <div className="flex items-center text-xs xs:text-sm">
        <p className="listItem__detail ">${price}</p>
        <span className="listItem__detail w-12 xs:w-20 text-[green] font-semibold">
          In Stock
        </span>

        <p className="listItem__detail w-20  xs:w-28 sm:w-32 ">
          <AddtoCartBtn
            extraClass={"text-[10px] sm:text-sm"}
            product={cartProduct}
          />
        </p>
        <button
          className="w-5 text-secondary--shade__0 text-sm "
          onClick={handleRemove}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ListItem;
