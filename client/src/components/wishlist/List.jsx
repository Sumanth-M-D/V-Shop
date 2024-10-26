import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

function List() {
  // Access the wishlistProducts state from the Redux store
  const { wishlistProducts } = useSelector((state) => state.wishlist);

  return (
    <div className=" mt-10 ">
      <ListHeader />
      {/* Render the list of products in the wishlist */}
      <div className="flex flex-col gap-5">
        {wishlistProducts.map((ele) => (
          <ListItem product={ele} key={ele.product.id} />
        ))}
      </div>
    </div>
  );
}

export default List;
