"use client";

import { useState } from "react";
import { Slot } from "@/types/provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import SlotModal from "./SlotModal";
import SlotSection from "./SlotSection";
import { calculateDuration, generateNewSlotId } from "./helpers";

import { dummySlots } from "./data";
import Stats from "./Stats";
import { handleGetProvider } from "@/fetchers";

export default function ProviderDashboard() {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["provider", username],
    queryFn: () => handleGetProvider(username!),
    enabled: !!username,
  });

  const [slots, setSlots] = useState<Slot[]>(dummySlots);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    startHour: "",
    endHour: "",
  });

  const openCreateModal = () => {
    setEditingSlot(null);
    setFormData({ date: "", startHour: "", endHour: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (slot: Slot) => {
    setEditingSlot(slot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingSlot(null);
    setIsModalOpen(false);
  };

  const deleteSlot = (slotId: number) => {
    if (confirm("Are you sure you want to delete this slot?")) {
      setSlots(slots.filter((s) => s.id !== slotId));
    }
  };

  const handleSubmit = (data: any) => {
    const start = new Date(
      `${data.date}T${String(data.startHour).padStart(2, "0")}:00:00Z`
    ).toISOString();

    const end = new Date(
      `${data.date}T${String(data.endHour).padStart(2, "0")}:00:00Z`
    ).toISOString();

    const duration = calculateDuration(start, end);

    if (duration <= 0) {
      alert("End time must be after start time");
      return;
    }

    if (editingSlot) {
      setSlots(
        slots.map((s) =>
          s.id === editingSlot.id
            ? { ...s, startTime: start, endTime: end, duration }
            : s
        )
      );
    } else {
      const newSlot: Slot = {
        id: generateNewSlotId(slots),
        startTime: start,
        endTime: end,
        duration,
        status: "available",
      };

      setSlots([...slots, newSlot]);
    }

    closeModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const provider = data?.provider;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>

        <article className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{provider?.name}</h2>
              <p className="text-muted-foreground">{provider?.email}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-primary mb-1">
                <span className="text-2xl font-bold">
                  ${Number(provider?.hourlyRate)?.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
            </div>
          </div>
        </article>

        <Stats />

        <SlotSection
          slots={slots}
          openCreateModal={openCreateModal}
          openEditModal={openEditModal}
          deleteSlot={deleteSlot}
        />
      </div>

      {isModalOpen && (
        <SlotModal
          isOpen={true}
          mode={editingSlot ? "edit" : "create"}
          slot={editingSlot}
          onClose={closeModal}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          slots={slots}
        />
      )}
    </div>
  );
}
