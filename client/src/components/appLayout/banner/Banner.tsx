import { TbBulb } from "react-icons/tb";
import CategoryList from "./CategoryList";

function Banner() {
  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="flex items-center w-full overflow-hidden">
        <CategoryList />

        <div className="flex items-center px-4 py-3 border-l-2 border-secondary--shade__0 flex-shrink-0">
          <div className="text-secondary flex gap-2 items-center">
            <TbBulb className="text-primary text-lg animate-pulse" />
            <span className="text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
              Clearance up to 30% off
            </span>
            <span className="text-xs sm:hidden">30% off</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Banner;
