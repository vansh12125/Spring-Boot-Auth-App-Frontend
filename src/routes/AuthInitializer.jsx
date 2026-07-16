import { useEffect } from "react";
import { RefreshTokenRequest } from "@/service";
import { login, logout, finishInitialization } from "@/redux";
import { useAuth } from "@/hooks";

export default function AuthInitializer({ children }) {
  const { initialized, accessToken, dispatch } = useAuth();

  useEffect(() => {
    console.log("AuthInitializer mounted");

    const initializeAuth = async () => {
      console.log("initializeAuth started");

      if (accessToken) {
        console.log("Already authenticated");
        dispatch(finishInitialization());
        return;
      }

      try {
        console.log("Calling refresh...");
        const response = await RefreshTokenRequest();

        console.log("Refresh success", response);

        dispatch(
          login({
            accessToken: response.data.accessToken,
            user: response.data.user,
          })
        );
      } catch (err) {
        console.log("Refresh failed", err);
        dispatch(logout());
      } finally {
        console.log("Dispatching finishInitialization");
        dispatch(finishInitialization());
      }
    };

    initializeAuth();
  }, [accessToken, dispatch]);

  console.log("initialized =", initialized);

  if (!initialized) {
    return <h1>Loading...</h1>;
  }

  return children;
}