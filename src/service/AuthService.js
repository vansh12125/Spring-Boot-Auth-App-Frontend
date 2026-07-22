import { apiClient, baseURL } from "@/config";

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

const LogoutAllSession = async () => {
  return await apiClient.post("/auth/logout-all");
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

const LinkGoogleAccount = () => {
  window.location.href = `${baseURL}/auth/link/google`;
};

const LinkGithubAccount = async () => {
  window.location.href = `${baseURL}/auth/link/github`;
};

const UnLinkAccount = async (provider) => {
  return await apiClient.delete("/auth/unlink", {
    data: provider,
  });
};

const getAllActiveSession = async () => {
  return await apiClient.get(`/auth/user/sessions`);
};

const logoutParticularSession = async (sessionId) => {
  return await apiClient.delete(`/auth/user/sessions/${sessionId}`);
};

const deleteUser = async () => {
  return await apiClient.delete(`/auth/user/delete`);
};

const sendResetPasswordOtp = async (data) => {
  return await apiClient.post(`/auth/send-otp/reset-password`, data);
};

const verifyResetPasswordOtp = async (data) => {
  return await apiClient.post(`/auth/verify-otp/reset-password`, data);
};

const changePasswordRequest = async (data) => {
  return await apiClient.patch(`/auth/change-password`, data);
};

const SetPassword = async (data) => {
  return await apiClient.patch(`/auth/set-password`, data);
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
  LinkGoogleAccount,
  LinkGithubAccount,
  LogoutAllSession,
  getAllActiveSession,
  logoutParticularSession,
  deleteUser,
  sendResetPasswordOtp,
  verifyResetPasswordOtp,
  UnLinkAccount,
  changePasswordRequest,
  SetPassword,
};
