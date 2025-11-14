"use client";

import { Plus } from "lucide-react";
import { Slot } from "@/types/provider";
import { useQuery } from "@tanstack/react-query";
import { handleGetProviderSlots } from "@/fetchers";

interface SlotSectionProps {
  username: string;
  openCreateModal: () => void;
}

export default function SlotSection({
  username,
  openCreateModal,
}: SlotSectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["slots", username],
    queryFn: () => handleGetProviderSlots(username),
    enabled: !!username,
  });

  if (isLoading) return <section className="p-6">Loading slots...</section>;

  const slots = data?.slots;

  return (
    <section className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Availability Slots</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          <Plus className="w-4 h-4 " />
          Create Slot
        </button>
      </div>

      <div className="p-6">
        {!slots || slots.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            No slots created yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {slots.map((slot: Slot) => (
              <li
                key={slot.id}
                className="border border-border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {new Date(slot.startTime).toLocaleString()} →{" "}
                    {new Date(slot.endTime).toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    Duration: {slot.duration} minutes
                  </p>
                  <p
                    className={`text-sm ${
                      slot.status === "available"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {slot.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
