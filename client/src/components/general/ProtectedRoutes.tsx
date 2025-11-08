import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/redux";

interface ProtectedRoutesProps {
  children: ReactNode;
}

// Component to protect routes based on authentication status
function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuthenticated } = useAppSelector(
    (state) => state.authentication
  );

  return (
    <>{isAuthenticated ? children : <Navigate to={"/authentication"} />}</>
  );
}

export default ProtectedRoutes;
