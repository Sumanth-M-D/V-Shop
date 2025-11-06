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
    <div className="md:order-none order-last flex  flex-wrap sm:flex-nowrap gap-4 justify-around items-center py-2 px-2 w-screen md:w-[60%]">
      {categories.map((category, i) => (
        <Category category={category} key={i} categoryIndex={i} />
      ))}
    </div>
  );
}

export default CategoryList;
