import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../features/categoriesSlice";
import { useEffect } from "react";
import Category from "./Category";

function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center py-3 px-4 flex-1 overflow-x-auto scrollbar-hide">
      {categories.map((category, i) => (
        <Category category={category} key={i} categoryIndex={i} />
      ))}
    </div>
  );
}

export default CategoryList;
