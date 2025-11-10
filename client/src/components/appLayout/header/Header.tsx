import Logo from "../../general/Logo";
import Searchbar from "./Searchbar";
import WishlistBtn from "./WishlistBtn";
import CartBtn from "./CartBtn";
import UserBtn from "./UserBtn";

function Header() {
  return (
    <header className="shadow-md bg-white">
      <div className="flex justify-between items-center gap-y-6 px-4 md:px-6 lg:px-8 py-4 flex-wrap">
        <Logo />
        <Searchbar />

        <div className="flex items-center gap-2 md:gap-4">
          <UserBtn />
          <WishlistBtn />
          <CartBtn />
        </div>
      </div>
    </header>
  );
}

export default Header;
