import { apiClient } from "@/config";

const getUserProfileByUsername = async (username) => {
    return await apiClient.get(`/users/username/${username}`)
};

export { getUserProfileByUsername ,};
