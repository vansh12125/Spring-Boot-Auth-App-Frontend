import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";

export default function GuestRoute({ children }) {
  const { initialized, isAuthenticated } = useAuth();

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}