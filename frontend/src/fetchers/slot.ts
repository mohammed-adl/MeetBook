import { reqApi } from "@/lib/axios";

export async function handleGetSlotsStats() {
  return await reqApi("/slots/stats");
}
