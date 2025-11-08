import { useNavigate } from "react-router-dom";
import {
  resetCurrentPage,
  fetchProducts,
} from "../../../features/productSlice";
import { updateActiveCategory } from "../../../features/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

interface CategoryProps {
  category: string;
  categoryIndex: number;
}

function Category({ category, categoryIndex }: CategoryProps) {
  const { activeCategoryIndex } = useAppSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeIndexNumber =
    typeof activeCategoryIndex === "number"
      ? activeCategoryIndex
      : Number.parseInt(`${activeCategoryIndex}`, 10);
  const isActive = activeIndexNumber === categoryIndex;

  function handleClick() {
    dispatch(updateActiveCategory(categoryIndex));
    dispatch(resetCurrentPage());
    dispatch(fetchProducts());
    navigate("/");
  }

  return (
    <button
      className={`
        relative px-3 py-2 text-xs sm:text-sm font-medium capitalize whitespace-nowrap
        transition-all duration-200 rounded
        ${
          isActive
            ? "text-primary bg-white/10"
            : "text-white hover:text-primary hover:bg-white/5"
        }
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
        after:bg-primary after:scale-x-0 after:transition-transform after:duration-200
        ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
      `}
      onClick={handleClick}
    >
      {category}
    </button>
  );
}

export default Category;
