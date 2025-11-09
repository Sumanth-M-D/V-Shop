import ProductCard from "./ProductCard";
import { useAppSelector } from "../../hooks/redux";

function ProductList() {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center pb-14 pt-24 px-4 lg:px-14 2xl:px-24">
      {products.map((product) => (
        <ProductCard product={product} key={product.productId} />
      ))}
    </div>
  );
}

export default ProductList;
