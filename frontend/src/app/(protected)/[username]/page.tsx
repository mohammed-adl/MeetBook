"use client";

import { useState } from "react";
import { Slot } from "@/types/provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import SlotModal from "./SlotModal";
import SlotSection from "./SlotSection";

import StatsSection from "./StatsSection";
import { handleGetProvider } from "@/fetchers";

export default function ProviderDashboard() {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["provider", username],
    queryFn: () => handleGetProvider(username!),
    enabled: !!username,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setFormData({
      date: slot.startTime.split("T")[0],
      startHour: new Date(slot.startTime).getHours().toString(),
      endHour: new Date(slot.endTime).getHours().toString(),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingSlot(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("Submit new/edit slot → send to backend", data);

    // You will add mutation here once backend endpoint is ready

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

        <StatsSection />

        <SlotSection
          username={username}
          openCreateModal={openCreateModal}
          openEditModal={openEditModal}
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
        />
      )}
    </div>
  );
}
