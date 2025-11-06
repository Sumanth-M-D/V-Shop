import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

function ProductDetail() {
  let { id } = useParams();

  const {
    products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  const { categories, activeCategoryIndex } = useSelector(
    (state) => state.categories
  );

  const {
    productData,
    error: productDetailsError,
    status: productDetailsStatus,
  } = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();

  const showProductDetails =
    productsStatus === "success" && productDetailsStatus === "success";

  useEffect(() => {
    const product = products.find((product) => product.productId === id);

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
