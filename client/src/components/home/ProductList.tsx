import { useCallback, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import EmptyState from "../general/EmptyState";
import {
  setSearchText,
  updateActiveCategory,
} from "../../features/categoriesSlice";
import { resetCurrentPage, fetchProducts } from "../../features/productSlice";

function ProductList() {
  const { products } = useAppSelector((state) => state.products);
  const { searchText, activeCategoryIndex } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  const hasActiveFilters = useMemo(() => {
    if (searchText.length > 0) return true;
    if (typeof activeCategoryIndex === "number") {
      return activeCategoryIndex > 0;
    }
    return activeCategoryIndex !== "" && Number(activeCategoryIndex) > 0;
  }, [activeCategoryIndex, searchText]);

  const handleResetFilters = useCallback(() => {
    dispatch(setSearchText(""));
    dispatch(updateActiveCategory(0));
    dispatch(resetCurrentPage());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.length === 0) {
    return (
      <div className="px-4 pb-14 pt-24 lg:px-14 2xl:px-24">
        <EmptyState
          icon={<FiSearch />}
          title="We couldn’t find any products"
          subtitle={
            hasActiveFilters
              ? "Try adjusting your filters or search terms to find what you’re looking for."
              : "Check back soon for new arrivals or explore other categories."
          }
          ctaLabel={hasActiveFilters ? "Reset filters" : undefined}
          onAction={hasActiveFilters ? handleResetFilters : undefined}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center pb-14 pt-24 px-4 lg:px-14 2xl:px-24">
      {products.map((product) => (
        <ProductCard product={product} key={product.productId} />
      ))}
    </div>
  );
}

export default ProductList;
