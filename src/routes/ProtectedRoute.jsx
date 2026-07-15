import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";

export default function ProtectedRoute({ children }) {
  const { initialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}