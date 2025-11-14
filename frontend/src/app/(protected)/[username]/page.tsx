"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

import { Provider, Slot, FormDataType } from "@/types/provider";

import SlotModal from "./SlotModal";
import {
  calculateDuration,
  calculateEarnings,
  generateNewSlotId,
} from "./helpers";

import { dummyProvider, dummySlots } from "./data";
import Stats from "./Stats";

export default function ProviderDashboard() {
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

  const stats = {
    totalSlots: slots.length,
    availableSlots: slots.filter((s) => s.status === "available").length,
    bookedSlots: slots.filter((s) => s.status === "booked").length,
    confirmedEarnings: slots
      .filter((s) => s.status === "booked")
      .reduce(
        (sum, s) =>
          sum + Number(calculateEarnings(s.duration, provider.hourlyRate)),
        0
      )
      .toFixed(2),
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage your availability and bookings
        </p>

        {/* Provider Info */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p className="text-muted-foreground">{provider.email}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-primary mb-1">
                <span className="text-2xl font-bold">
                  ${provider.hourlyRate.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
            </div>
          </div>
        </div>

        {/* Stats Component */}
        <Stats stats={stats} />

        {/* Slots Section */}
        <div className="bg-card border border-border rounded-lg shadow-sm">
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
            {slots.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="text-muted">
                Calendar is available inside the slot creation modal.
              </div>
            )}
          </div>
        </div>
      </div>

      <SlotModal
        isOpen={isModalOpen}
        mode={editingSlot ? "edit" : "create"}
        slot={editingSlot}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        slots={slots}
        provider={provider}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
      <p className="text-muted-foreground">
        No slots created yet. Create your first availability slot!
      </p>
    </div>
  );
}
