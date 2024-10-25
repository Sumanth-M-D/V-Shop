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
  let { id } = useParams(); // Get the product ID from the URL

  // Get product data and status from Redux store
  const {
    products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  // Get categories data from Redux store
  const { categories, activeCategoryIndex } = useSelector(
    (state) => state.categories
  );

  // Get product detail information from Redux store
  const {
    productData,
    error: productDetailsError,
    status: productDetailsStatus,
  } = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();

  // Determine whether both product list and product details have successfully loaded
  const showProductDetails =
    productsStatus === "success" && productDetailsStatus === "success";

  // Fetch product details when the component mounts or the product ID changes
  useEffect(() => {
    // Check if the product is already in the local state
    const product = products.find((product) => product.id === id);

    if (product) {
      // If product is found, set it in the local state
      dispatch(setProductData(product));
    } else {
      // If product not found, set product ID and fetch product details from API
      dispatch(setProductId(id));
      dispatch(fetchProductDetails(id));
    }

    // Cleanup function to reset product details when component unmounts
    return () => {
      dispatch(resetProductDetails());
    };
  }, [id, products, dispatch]);

  // Update active category only when necessary
  useEffect(() => {
    if (productData.category && categories.length > 0) {
      const categoryIndex = categories.indexOf(productData.category);

      // Only dispatch if the category is different from the current active category
      if (categoryIndex >= 0 && categoryIndex !== activeCategoryIndex) {
        dispatch(updateActiveCategory(categoryIndex));
        dispatch(fetchProducts());
      }
    }
  }, [productData.category, categories, dispatch, activeCategoryIndex]);

  // Show loading spinner if either products or product details are still loading
  if (productsStatus === "loading" || productDetailsStatus === "loading") {
    return <Loading />;
  }

  // Show error message if fetching product details fails
  if (productDetailsStatus === "fail") {
    return <Error errorMessage={productDetailsError} />;
  }

  // Show error message if fetching products fails
  if (productsStatus === "fail") {
    return <Error errorMessage={productsError} />;
  }

  return (
    <>
      {/* Display product details only if both products and product details are successfully loaded */}
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
