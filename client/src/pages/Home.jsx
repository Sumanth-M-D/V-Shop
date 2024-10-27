import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../components/home/Pagination";
import ProductList from "../components/home/ProductList";
import Loading from "../components/general/Laoding";

import useProductsPerRow from "../custom_hooks/useProductsPerRow";
import Error from "../components/general/Error";
import WhatWeProvide from "../components/home/WhatWeProvide";
import { updateActiveCategory } from "../features/categoriesSlice";

function Home() {
  // Get products state variables from redux store
  const { status: productStatus, error: productError } = useSelector(
    (state) => state.products
  );

  // Get category state variables from Redux store
  const {
    status: categoryStatus,
    activeCategoryIndex,
    error: categoryError,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  // Use custom hook to handle products per row update based on screen size
  useProductsPerRow();

  useEffect(() => {
    if (categoryStatus === "success") {
      // If no active category is selected, set the default to the first category
      if (activeCategoryIndex === "") {
        dispatch(updateActiveCategory(0));
      }
      // Fetch products after category is set
      dispatch(fetchProducts());
    }
  }, [dispatch, activeCategoryIndex, categoryStatus]);

  // Display loading spinner while products are being fetched
  if (productStatus === "loading") {
    return <Loading />;
  }

  // Display error message if category fetch fails
  if (categoryStatus === "fail") {
    return <Error errorMessage={categoryError} />;
  }

  // Display error message if product fetch fails
  if (productStatus === "fail") {
    return <Error errorMessage={productError} />;
  }

  return (
    <main>
      <ProductList />
      <Pagination />
      <WhatWeProvide />
    </main>
  );
}

export default Home;
