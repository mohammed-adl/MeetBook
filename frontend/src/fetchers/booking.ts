import { reqApi } from "@/lib/axios";

export async function handleCreateBooking(slotId: any) {
  return await reqApi("/bookings", {
    method: "POST",
    body: slotId,
  });
}
