import { useEffect } from "react";
import { RefreshTokenRequest } from "@/service";
import {
  login,
  logout,
  finishInitialization,
} from "@/redux";
import { useAuth } from "@/hooks";

export default function AuthInitializer({ children }) {
  const { initialized, dispatch } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await RefreshTokenRequest();

        const { accessToken, user } = response.data;

        dispatch(
          login({
            accessToken,
            user,
          })
        );
      } catch (error) {
        dispatch(logout());
      } finally {
        dispatch(finishInitialization());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return children;
}