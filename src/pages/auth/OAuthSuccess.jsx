import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshTokenRequest } from "@/service";
import { useAuth } from "@/hooks";
import { login } from "@/redux";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await RefreshTokenRequest();

        const { accessToken, user } = response.data;

        dispatch(
          login({
            accessToken,
            user,
          })
        );

        navigate("/dashboard", { replace: true });
      } catch (error) {
        navigate("/signin", { replace: true });
      }
    };

    authenticate();
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      Signing you in...
    </div>
  );
}