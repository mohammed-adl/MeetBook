"use client";

import { Plus } from "lucide-react";
import { Slot } from "@/types/provider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGetProviderSlots } from "@/fetchers";

interface SlotSectionProps {
  username: string;
  openCreateModal: () => void;
  openEditModal: (slot: Slot) => void;
}

export default function SlotSection({
  username,
  openCreateModal,
  openEditModal,
}: SlotSectionProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["slots", username],
    queryFn: () => handleGetProviderSlots(username),
    enabled: !!username,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/slots/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots", username] });
    },
  });

  const deleteSlot = (id: number) => {
    if (confirm("Are you sure you want to delete this slot?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <section className="p-6">Loading slots...</section>;
  const slots = data?.slots;

  return (
    <section className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Availability Slots</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          <Plus className="w-4 h-4" />
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

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(slot)}
                    className="px-3 py-1 rounded bg-primary text-primary-foreground"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSlot(slot.id)}
                    className="px-3 py-1 rounded bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
