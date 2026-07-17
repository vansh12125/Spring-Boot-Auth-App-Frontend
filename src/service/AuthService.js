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

const RefreshTokenRequest = async () => {
  return await apiClient.post("/auth/refresh");
};

const LoginUserByUsername = async (userData) => {
  return await apiClient.post("/auth/login", userData);
};

const LogoutUser = async () => {
  return await apiClient.post("/auth/signout");
};

const UpdateProfile = async (userData) => {
  return await apiClient.patch("/users/profile", userData);
};

const SendOtpToEmail = async (data) => {
  return await apiClient.post("/auth/send-otp", data);
};

const VerifyOtpCode = async (data) => {
  return await apiClient.post("/auth/verify-otp", data);
};

const ResendOtp = async (data) => {
  return await apiClient.post("/auth/resend-otp", data);
};

export {
  RegisterUserByUsername,
  LoginUserByGoogle,
  LoginUserByGithub,
  RefreshTokenRequest,
  LoginUserByUsername,
  LogoutUser,
  UpdateProfile,
  SendOtpToEmail,
  VerifyOtpCode,
  ResendOtp,
};
