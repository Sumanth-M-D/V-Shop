function CartListHeader() {
  return (
    <div className="flex justify-between text-sm pb-2 mb-5 border-b border-secondary--shade__1">
      <p className="listItem__title">Product</p>
      <div className="flex">
        <p className="listItem__detail ">Price</p>
        <p className="listItem__detail w-16 xs:w-20">Quantity</p>
        <p className="listItem__detail ">Total</p>
        <p className="w-5"></p>
      </div>
    </div>
  );
}

export default CartListHeader;
