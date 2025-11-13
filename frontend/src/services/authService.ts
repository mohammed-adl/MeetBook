import { jwtDecode } from "jwt-decode";
import { handleRefreshToken } from "../fetchers";

const authService = {
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return accessToken;
  },

  validateAccessToken: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      authService.logout();
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = new Date().getTime() / 1000;
      return decoded.exp! < currentTime;
    } catch {
      authService.logout();
    }
  },

  callRefreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        authService.logout();
        return;
      }
      const data = await handleRefreshToken(refreshToken);
      return data;
    } catch (err: any) {
      authService.logout();
      throw err;
    }
  },

  clearSession: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  logout: () => {
    authService.clearSession();
    window.location.href = "/";
  },
};

export default authService;
