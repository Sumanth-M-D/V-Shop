// Component for displaying and updating the quantity of a product
type ProductQuantityProps = {
  quantity?: number;
  updateQuantity: (quantity: number) => void;
};

function ProductQuantity({
  quantity = 1,
  updateQuantity,
}: ProductQuantityProps) {
  return (
    <div className="grid grid-cols-3 justify-items-center text-sm border-secondary--shade__1  py-1 w-full border-[1px] ">
      <button
        className="w-full"
        onClick={() => quantity > 1 && updateQuantity(quantity - 1)}
      >
        -
      </button>
      <p>{quantity}</p>
      <button className="w-full" onClick={() => updateQuantity(quantity + 1)}>
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
