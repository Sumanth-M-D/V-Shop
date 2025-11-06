import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

function List() {
  const { wishlistProducts } = useSelector((state) => state.wishlist);

  return (
    <div className=" mt-10 ">
      <ListHeader />
      <div className="flex flex-col gap-5">
        {wishlistProducts.map((ele) => (
          <ListItem product={ele} key={ele.product.productId} />
        ))}
      </div>
    </div>
  );
}

export default List;
