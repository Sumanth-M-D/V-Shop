import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCurrentPage } from "../../../features/productSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { updateActiveCategory } from "../../../features/categoriesSlice";

function Category({ category, categoryIndex }) {
  // Access the activeCategoryIndex from the Redux store
  const { activeCategoryIndex } = useSelector((state) => state.categories);
  const navigate = useNavigate(); // Initialize the navigation hook

  const dispatch = useDispatch();
  const isActive = categoryIndex === activeCategoryIndex;

  // Function to handle category selection
  function handleClick() {
    dispatch(updateActiveCategory(categoryIndex));
    dispatch(resetCurrentPage());
    navigate("/");
  }

  return (
    <button
      className={`flex items-center text-xs xl:text-sm gap-[1px] xxs:gap-1 capitalize sm:uppercase hover:scale-105  ${
        isActive ? "activeCategory" : "text-white"
      }`}
      onClick={handleClick}
    >
      <span>{category}</span>
      <RiArrowDropDownLine />
    </button>
  );
}

export default Category;
