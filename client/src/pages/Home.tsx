import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import Pagination from "../components/home/Pagination";
import ProductList from "../components/home/ProductList";
import Loading from "../components/general/Laoding";
import Error from "../components/general/Error";
import WhatWeProvide from "../components/home/WhatWeProvide";
import { updateActiveCategory } from "../features/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function Home() {
  const { status: productStatus, error: productError } = useAppSelector(
    (state) => state.products
  );
  const {
    status: categoryStatus,
    activeCategoryIndex,
    error: categoryError,
  } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryStatus === "success") {
      if (activeCategoryIndex === "") {
        dispatch(updateActiveCategory(0));
      }
      dispatch(fetchProducts());
    }
  }, [dispatch, activeCategoryIndex, categoryStatus]);

  if (productStatus === "loading") {
    return <Loading />;
  }

  if (categoryStatus === "fail") {
    return <Error errorMessage={categoryError} />;
  }

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
