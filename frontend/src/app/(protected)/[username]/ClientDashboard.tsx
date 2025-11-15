"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllAvailableSlots } from "@/fetchers";

export default function ClientDashboard() {
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["availableSlots"],
    queryFn: () => handleGetAllAvailableSlots(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Debug logging
  console.log("API Response:", data);
  console.log("Slots:", data?.data?.slots);
  console.log("Is Loading:", isLoading);
  console.log("Error:", error);

  const slots = data?.slots || [];

  const calculateCost = (slot: any) => {
    if (!slot.user?.hourlyRate || !slot.duration) return 0;
    return ((slot.user.hourlyRate * slot.duration) / 60).toFixed(2);
  };

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

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load slots.</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!isLoading && slots.length === 0 && (
            <div className="text-muted-foreground">No available slots.</div>
          )}

          {slots.map((slot: any) => (
            <div
              key={slot.id}
              className="bg-card border border-border rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg">
                {slot.user?.fullName || slot.user?.username}
              </h3>

              <p className="text-sm text-muted-foreground mb-1">
                {new Date(slot.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(slot.endTime).toLocaleString()}
              </p>

              <p className="text-sm text-muted-foreground mb-2">
                Duration: {slot.duration} minutes
              </p>

              <p className="font-medium mb-4">
                Cost:{" "}
                <span className="text-primary">${calculateCost(slot)}</span>
              </p>

              <button
                onClick={() => openModal(slot)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
              >
                Book Slot
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-[420px]">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

            <p className="mb-2">
              <strong>Provider:</strong>{" "}
              {selectedSlot.user?.fullName || selectedSlot.user?.username}
            </p>

            <p className="text-sm text-muted-foreground mb-2">
              <strong>Start:</strong>{" "}
              {new Date(selectedSlot.startTime).toLocaleString()}
            </p>

            <p className="text-sm text-muted-foreground mb-2">
              <strong>End:</strong>{" "}
              {new Date(selectedSlot.endTime).toLocaleString()}
            </p>

            <p className="text-sm text-muted-foreground mb-4">
              <strong>Duration:</strong> {selectedSlot.duration} minutes
            </p>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-lg">
                <strong>Total Cost:</strong>{" "}
                <span className="text-primary text-xl font-bold">
                  ${calculateCost(selectedSlot)}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (${selectedSlot.user?.hourlyRate}/hour × {selectedSlot.duration}{" "}
                min)
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded-lg border hover:bg-muted transition"
                onClick={closeModal}
              >
                Cancel
              </button>

              {/* Booking backend not implemented yet */}
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
