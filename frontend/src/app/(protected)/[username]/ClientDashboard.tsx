"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ClientDashboard() {
  const params = useParams();
  const username = params.username as string;

  // Modal state
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------------------------
  // Backend temporarily removed
  // --------------------------

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["availableSlots", username],
  //   queryFn: () => handleGetAvailableSlots(username),
  //   enabled: !!username,
  // });

  // const { mutate: bookSlot, isPending: booking } = useMutation({
  //   mutationFn: (slotId: string) => handleBookSlot(slotId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["availableSlots", username] });
  //     closeModal();
  //   },
  // });

  // TEMP MOCK DATA (ONLY UNTIL BACKEND IS CONNECTED)
  const slots = [
    {
      id: "1",
      provider: { name: "John Provider" },
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      cost: 50,
    },
    {
      id: "2",
      provider: { name: "Sarah Provider" },
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      cost: 80,
    },
  ];

  // --------------------------
  // Modal functions
  // --------------------------

  const openModal = (slot: any) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSlot(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.length === 0 && (
            <div className="text-muted-foreground">No available slots.</div>
          )}

          {slots.map((slot: any) => (
            <div
              key={slot.id}
              className="bg-card border border-border rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{slot.provider.name}</h3>

              <p className="text-sm text-muted-foreground mb-1">
                {new Date(slot.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(slot.endTime).toLocaleString()}
              </p>

              <p className="font-medium mb-4">
                Cost: <span className="text-primary">${slot.cost}</span>
              </p>

              <button
                onClick={() => openModal(slot)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg"
              >
                Book Slot
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg w-[420px]">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

            <p className="mb-2">
              <strong>Provider:</strong> {selectedSlot.provider.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {new Date(selectedSlot.startTime).toLocaleString()} —{" "}
              {new Date(selectedSlot.endTime).toLocaleString()}
            </p>

            <div className="mt-4">
              <strong>Total Cost:</strong>{" "}
              <span className="text-primary">${selectedSlot.cost}</span>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded-lg border"
                onClick={closeModal}
              >
                Cancel
              </button>

              {/* Button disabled for now (backend commented) */}
              <button
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground opacity-50 cursor-not-allowed"
                disabled
              >
                Confirm (disabled)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
