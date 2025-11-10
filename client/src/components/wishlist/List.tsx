import ListItem from "./ListItem";
import ListHeader from "./ListHeader";
import { useAppSelector } from "../../hooks/redux";
import { WishlistItem } from "../../types/cart.types";

function List() {
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);

  return (
    <div className=" mt-10 ">
      <ListHeader />
      <div className="flex flex-col gap-5">
        {wishlistProducts.map((ele: WishlistItem) => (
          <ListItem product={ele} key={ele.productId} />
        ))}
      </div>
    </div>
  );
}

export default List;
