import { reqApi } from "@/lib/axios";

export async function handleGetProvider(username: string) {
  return await reqApi(`/providers/${username}`);
}
