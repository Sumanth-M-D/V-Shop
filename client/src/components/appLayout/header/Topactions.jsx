import { IoCallOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/authenticationSlice";
import { toast } from "react-toastify";

function Topactions() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  // Function to handle click events for login/logout button
  function handleClick() {
    if (isAuthenticated) {
      dispatch(logout()); // Dispatch logout action if the user is authenticated
      toast("User has been logged out"); // Show a toast notification upon logout
      navigate("/");
    } else {
      navigate("/authentication"); // Redirect to authentication page if the user is not authenticated
    }
  }

  return (
    <div className="text-xs  text-secondary--shade__2 flex justify-between  border-b-[1px] border-solid border-secondary py-1 px-2 mb-6 ">
      <div className="flex gap-2 items-center">
        <IoCallOutline /> <span>Call +0123456789</span>
      </div>
      <div className="flex gap-3 xxs:gap-8">
        <p className="flex items-center">
          USD <RiArrowDropDownLine />
        </p>
        <p className="flex items-center">
          English <RiArrowDropDownLine />
        </p>
        <button
          className="font-semibold hover:text-primary--shade__1 hover:scale-105"
          onClick={handleClick}
        >
          {isAuthenticated ? "Logout" : "Sign in / Sign up"}
        </button>
      </div>
    </div>
  );
}

export default Topactions;
