"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Provider, Slot, FormDataType } from "@/types/provider";

import SlotModal from "./SlotModal";
import SlotSection from "./SlotSection";
import { calculateDuration, generateNewSlotId } from "./helpers";

import { dummyProvider, dummySlots } from "./data";
import Stats from "./Stats";

export default function ProviderDashboard() {
  const user = useUserStore((state) => state.user);
  const [provider] = useState<Provider>(dummyProvider);
  const [slots, setSlots] = useState<Slot[]>(dummySlots);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    date: "",
    startTime: "",
    endTime: "",
  });

  const openCreateModal = () => {
    setEditingSlot(null);
    setFormData({ date: "", startTime: "", endTime: "" });
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

  const handleSubmit = (data: FormDataType) => {
    const start = new Date(`${data.date}T${data.startTime}`).toISOString();
    const end = new Date(`${data.date}T${data.endTime}`).toISOString();
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage your availability and bookings
        </p>

        <article className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-primary mb-1">
                <span className="text-2xl font-bold">
                  ${Number(user?.hourlyRate)?.toFixed(2)}
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
          provider={provider}
        />
      )}
    </div>
  );
}
