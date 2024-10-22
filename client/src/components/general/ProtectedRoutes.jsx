import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component to protect routes based on authentication status
function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useSelector((state) => state.authentication);

  return (
    <>{isAuthenticated ? children : <Navigate to={"/authentication"} />}</>
  );
}

export default ProtectedRoutes;
