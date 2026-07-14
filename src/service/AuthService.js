import { apiClient } from "@/config";

const RegisterUserByUsername = async (userData) => {
    return await apiClient.post(`/auth/register`, userData);
};

const LoginUserByGoogle = async () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}oauth2/authorization/google`;
};
const LoginUserByGithub = async () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}oauth2/authorization/github`;
};

const RefreshTokenRequest = async()=>{
   return await apiClient.post("/auth/refresh");
};

const LoginUserByUsername=async (userData) =>{
  return await apiClient.post("/auth/login",userData)
}

export { RegisterUserByUsername, LoginUserByGoogle, LoginUserByGithub,RefreshTokenRequest,LoginUserByUsername };
