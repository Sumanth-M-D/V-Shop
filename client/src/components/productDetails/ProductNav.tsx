import BreadCrumb from "../general/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Product } from "../../types/product.types";

interface ProductNavProps {
  id: string;
}

function ProductNav({ id }: ProductNavProps) {
  const { products } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  const breadCrumbElements = [
    { title: "Home", to: "/" },
    { title: "Products", to: "/" },
    { title: "product", to: "" },
  ];

  function handlePrev() {
    const prevIndex =
      products.findIndex((ele: Product) => ele.productId === id) - 1;
    if (prevIndex < 0 || !products[prevIndex]) return;

    const prevId = products[prevIndex].productId;
    navigate(`/products/${prevId}`);
  }

  function handleNext() {
    const nextIndex =
      products.findIndex((ele: Product) => ele.productId === id) + 1;
    if (nextIndex >= products.length || !products[nextIndex]) return;

    const nextId = products[nextIndex].productId;

    navigate(`/products/${nextId}`);
  }

  return (
    <div className="flex justify-between">
      <BreadCrumb elements={breadCrumbElements} />
      <div className="text-sm text-secondary--shade__1 flex gap-4">
        <button className="hover:font-bold flex gap-2" onClick={handlePrev}>
          &lt;
          <span>Prev</span>
        </button>
        <button className="hover:font-bold flex gap-2" onClick={handleNext}>
          <span>Next</span>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ProductNav;
