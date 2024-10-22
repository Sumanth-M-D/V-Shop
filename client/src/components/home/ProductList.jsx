import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function ProductList() {
  // Access the currentPageProducts from the Redux store
  const { currentPageProducts } = useSelector((state) => state.products);

  return (
    <div className="flex flex-wrap gap-2 md:gap-6 lg:gap-12 xl:gap-14  2xl:gap-20 justify-center pb-14 pt-24 px-4 lg:px-14 2xl:px-24">
      {/* Map over currentPageProducts to render a ProductCard for each product */}
      {currentPageProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
