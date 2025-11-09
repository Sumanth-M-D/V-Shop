function ListHeader() {
  return (
    <div className="flex justify-between text-xs sm:text-sm pb-2 mb-5 border-b border-secondary--shade__1">
      <p className="listItem__title">Product</p>
      <div className="flex">
        <p className="listItem__detail ">Price</p>
        <p className="listItem__detail w-12 xs:w-20">Stock Status</p>
        <p className="listItem__detail  w-20  xs:w-28 sm:w-32 "></p>
        <p className="w-5"></p>
      </div>
    </div>
  );
}

export default ListHeader;
