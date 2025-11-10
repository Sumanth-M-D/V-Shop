import { useCallback } from "react";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ListItem from "./ListItem";
import ListHeader from "./ListHeader";
import { useAppSelector } from "../../hooks/redux";
import { WishlistItem } from "../../types/cart.types";
import EmptyState from "../general/EmptyState";

function List() {
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);
  const navigate = useNavigate();

  const handleDiscoverProducts = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-10">
        <EmptyState
          icon={<FiHeart />}
          title="Nothing saved yet"
          subtitle="Add products to your wishlist to keep track of the items you’re excited about."
          ctaLabel="Discover products"
          onAction={handleDiscoverProducts}
        />
      </div>
    );
  }

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
