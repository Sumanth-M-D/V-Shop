import Topactions from "./Topactions";
import Logo from "../../general/Logo";
import Searchbar from "./Searchbar";
import WishlistBtn from "./WishlistBtn";
import CartBtn from "./CartBtn";

function Header() {
  return (
    <header className="shadow-md bg-white">
      <Topactions />

      <div className="flex justify-between items-center gap-y-6 px-4 md:px-6 lg:px-8 py-4 flex-wrap">
        <Logo />
        <Searchbar />

        <div className="flex gap-4 md:gap-6">
          <WishlistBtn />
          <CartBtn />
        </div>
      </div>
    </header>
  );
}

export default Header;
