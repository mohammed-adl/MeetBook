import { reqApi, refreshApi } from "@/lib/axios";

export async function handleSignup(formData: any) {
  return await reqApi("/auth/signup", {
    method: "POST",
    body: formData,
  });
}

export async function handleLogin(formData: any) {
  return await reqApi("/auth/login", {
    method: "POST",
    body: formData,
  });
}

export async function handleRefreshToken(refreshToken: any) {
  const response = await refreshApi.post("/auth/refresh-token", {
    refreshToken: refreshToken,
  });
  return response.data;
}
