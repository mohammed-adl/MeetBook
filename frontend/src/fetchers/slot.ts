import { reqApi } from "@/lib/axios";

export async function handleGetSlotsStats() {
  return await reqApi("/slots/stats");
}

export async function handleGetProviderSlots(username: string) {
  return await reqApi(`/slots/${username}`);
}

export async function handleCreateSlot(data: any) {
  return await reqApi("/slots", {
    method: "POST",
    body: data,
  });
}
