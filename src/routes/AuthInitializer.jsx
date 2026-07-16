import { useEffect } from "react";
import { RefreshTokenRequest } from "@/service";
import { login, logout, finishInitialization } from "@/redux";
import { useAuth } from "@/hooks";

export default function AuthInitializer({ children }) {
  const { initialized, accessToken, dispatch } = useAuth();

  useEffect(() => {
    .log("AuthInitializer mounted");

    const initializeAuth = async () => {
      .log("initializeAuth started");

      if (accessToken) {
        .log("Already authenticated");
        dispatch(finishInitialization());
        return;
      }

      try {
        .log("Calling refresh...");
        const response = await RefreshTokenRequest();

        .log("Refresh success", response);

        dispatch(
          login({
            accessToken: response.data.accessToken,
            user: response.data.user,
          })
        );
      } catch (err) {
        .log("Refresh failed", err);
        dispatch(logout());
      } finally {
        .log("Dispatching finishInitialization");
        dispatch(finishInitialization());
      }
    };

    initializeAuth();
  }, [accessToken, dispatch]);

  .log("initialized =", initialized);

  if (!initialized) {
    return <h1>Loading...</h1>;
  }

  return children;
}