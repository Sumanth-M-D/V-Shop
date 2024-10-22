import BreadCrumb from "../components/general/BreadCrumb";
import Cart_Wishlist_Title from "../components/general/Cart_Wishlist_Title";
import CouponCode from "../components/shoppingcart/CouponCode";
import List from "../components/shoppingcart/CartList";
import PriceCard from "../components/shoppingcart/PriceCard";

function ShoppingCart() {
  // Breadcrumb data for navigation on the Shopping Cart page
  const breadCrumbElements = [
    { title: "Home", to: "/" },
    { title: "Shop", to: "/" },
    { title: "Shopping cart", to: "" },
  ];

  return (
    <div className="mb-16 ">
      <Cart_Wishlist_Title title={"Shopping Cart"} />
      <div className="px-3 xs:px-10 sm:px-20  md:px-0 md:w-[750px] upperMd:w-[800px] lg:w-[900px] 2xl:w-[1000px] mx-auto mt-2 ">
        <BreadCrumb elements={breadCrumbElements} />
        <div className="w-full md:flex gap-4 justify-between mt-10">
          <div>
            <List />
            <CouponCode />
          </div>
          <PriceCard />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
