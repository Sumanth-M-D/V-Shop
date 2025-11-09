import { RxUpdate } from "react-icons/rx";

function CouponCode() {
  return (
    <div className="text-xs upperMd:text-sm flex justify-between">
      <div>
        <input
          placeholder="coupon code"
          className="focus:outline-none bg-secondary px-2 py-1 mr-1"
        />
        <button className="hover:shadow-md borderPrimary py-1 px-2">
          &rarr;
        </button>
      </div>
      <button className="hover:shadow-md px-3 py-1 borderSecondary flex items-center gap-2">
        Update Cart
        <RxUpdate />
      </button>
    </div>
  );
}

export default CouponCode;
