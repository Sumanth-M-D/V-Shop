import BreadCrumb from "../components/general/BreadCrumb";
import Cart_Wishlist_Title from "../components/general/Cart_Wishlist_Title";
import List from "../components/wishlist/List";

function Wishlist() {
  // Breadcrumb data for navigation on the wishlist page
  const breadCrumbElements = [
    { title: "Home", to: "/" },
    { title: "Shop", to: "/" },
    { title: "Wishlist", to: "" },
  ];

  return (
    <div className="mb-16 ">
      <Cart_Wishlist_Title title={"Wishlist"} />
      <div className="px-3 xs:px-5 sm:px-16  md:px-20 md:w-[750px] upperMd:w-[800px] lg:w-[900px] 2xl:w-[1000px] mx-auto mt-2 ">
        <BreadCrumb elements={breadCrumbElements} />
        <List />
      </div>
    </div>
  );
}

export default Wishlist;
