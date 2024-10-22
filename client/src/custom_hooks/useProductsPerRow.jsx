import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetCurrentPage,
  updateProductsPerRow,
} from "../features/productSlice";

// Custom hook to handle updating the number of products per row (per page) based on screen size
const useProductsPerRow = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleWindowResize() {
      const windowSize = window.innerWidth;

      // Reset current page when resizing to ensure proper pagination
      dispatch(resetCurrentPage());

      if (windowSize >= 1216) {
        dispatch(updateProductsPerRow(4));
      } else if (windowSize >= 800) {
        dispatch(updateProductsPerRow(3));
      } else if (windowSize >= 375) {
        dispatch(updateProductsPerRow(2));
      } else {
        dispatch(updateProductsPerRow(1));
      }
    }

    // Initial setup: run the function once to set the initial number of products per row
    handleWindowResize();

    // Add resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch]);
};

export default useProductsPerRow;
