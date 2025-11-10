import { useCallback } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux";

function UserBtn() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.authentication);

  const handleClick = useCallback(() => {
    if (isAuthenticated) {
      navigate("/user");
    } else {
      navigate("/authentication");
    }
  }, [isAuthenticated, navigate]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col items-center px-2 transition hover:scale-105"
    >
      <div className="relative">
        <FiUser className="text-2xl" />
      </div>
      <span className="text-[10px]">
        {isAuthenticated ? "Account" : "Sign in"}
      </span>
    </button>
  );
}

export default UserBtn;
