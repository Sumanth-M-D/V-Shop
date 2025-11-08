import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { updateActiveCategory } from "../features/categoriesSlice";
import { fetchProducts } from "../features/productSlice";
import {
  fetchProductDetails,
  setProductData,
  setProductId,
  resetProductDetails,
} from "../features/productDetailsSlice";

import ProductNav from "../components/productDetails/ProductNav";
import Loading from "../components/general/Laoding";
import Error from "../components/general/Error";
import MainDetails from "../components/productDetails/MainDetails";
import AdditionalDetails from "../components/productDetails/additinalDetails/AdditionalDetails";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Product } from "../types/product.types";

function ProductDetail() {
  const { id: routeId } = useParams();
  const id = routeId ?? "";

  const {
    products,
    status: productsStatus,
    error: productsError,
  } = useAppSelector((state) => state.products);

  const { categories, activeCategoryIndex } = useAppSelector(
    (state) => state.categories
  );

  const {
    productData,
    error: productDetailsError,
    status: productDetailsStatus,
  } = useAppSelector((state) => state.productDetails);

  const dispatch = useAppDispatch();

  const showProductDetails =
    productsStatus === "success" && productDetailsStatus === "success";

  useEffect(() => {
    if (!id) return;

    const product = products.find(
      (product: Product) => product.productId === id
    );

    if (product) {
      dispatch(setProductData(product));
    } else {
      dispatch(setProductId(id));
      dispatch(fetchProductDetails(id));
    }

    return () => {
      dispatch(resetProductDetails());
    };
  }, [id, products, dispatch]);

  useEffect(() => {
    if (productData.category && categories.length > 0) {
      const categoryIndex = categories.indexOf(productData.category);

      if (categoryIndex >= 0 && categoryIndex !== activeCategoryIndex) {
        dispatch(updateActiveCategory(categoryIndex));
        dispatch(fetchProducts());
      }
    }
  }, [productData.category, categories, dispatch, activeCategoryIndex]);

  if (productsStatus === "loading" || productDetailsStatus === "loading") {
    return <Loading />;
  }

  if (productDetailsStatus === "fail") {
    return <Error errorMessage={productDetailsError} />;
  }

  if (productsStatus === "fail") {
    return <Error errorMessage={productsError} />;
  }

  return (
    <>
      {showProductDetails && (
        <main className="py-8 px-10">
          <ProductNav id={id} />
          <MainDetails />
          <AdditionalDetails rating={productData.rating} />
        </main>
      )}
    </>
  );
}

export default ProductDetail;
