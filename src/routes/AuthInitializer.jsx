import { useEffect } from "react";
import { RefreshTokenRequest } from "@/service";
import { login, logout, finishInitialization } from "@/redux";
import { useAuth } from "@/hooks";

export default function AuthInitializer({ children }) {
  const { initialized, accessToken, dispatch } = useAuth();

  useEffect(() => {

    const initializeAuth = async () => {

      if (accessToken) {
        dispatch(finishInitialization());
        return;
      }

      try {
        const response = await RefreshTokenRequest();
        dispatch(
          login({
            accessToken: response.data.accessToken,
            user: response.data.user,
          })
        );
      } catch (err) {
        dispatch(logout());
      } finally {
        dispatch(finishInitialization());
      }
    };

    initializeAuth();
  }, [accessToken, dispatch]);

  if (!initialized) {
    return <h1>Loading...</h1>;
  }

  return children;
}