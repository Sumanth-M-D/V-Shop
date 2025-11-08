import { IoCallOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/authenticationSlice";
import { toast } from "react-toastify";

function Topactions() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  function handleClick() {
    if (isAuthenticated) {
      dispatch(logout());
      toast("User has been logged out");
      navigate("/");
    } else {
      navigate("/authentication");
    }
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs text-secondary--shade__2 flex justify-between items-center border-b border-secondary--shade__0 py-2 px-4 md:px-6 lg:px-8">
      <div className="flex gap-2 items-center hover:text-primary transition-colors">
        <IoCallOutline className="text-sm" />
        <span className="hidden sm:inline">Call +0123456789</span>
        <span className="sm:hidden">+0123456789</span>
      </div>
      <div className="flex gap-3 sm:gap-6 items-center">
        <button className="flex items-center hover:text-primary transition-colors">
          USD <RiArrowDropDownLine />
        </button>
        <button className="hidden sm:flex items-center hover:text-primary transition-colors">
          English <RiArrowDropDownLine />
        </button>
        <button
          className="flex items-center gap-1 font-semibold hover:text-primary transition-colors"
          onClick={handleClick}
        >
          <FiUser className="text-sm" />
          <span>{isAuthenticated ? "Logout" : "Sign in"}</span>
        </button>
      </div>
    </div>
  );
}

export default Topactions;
