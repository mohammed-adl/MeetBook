"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import SlotModal from "./SlotModal";
import SlotSection from "./SlotSection";
import StatsSection from "./StatsSection";

import { handleGetProvider, handleCreateSlot } from "@/fetchers";

export default function ProviderDashboard() {
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["provider", username],
    queryFn: () => handleGetProvider(username),
    enabled: !!username,
  });

  const provider = data?.provider;
  const hourlyRate = provider?.hourlyRate ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    startHour: "",
    endHour: "",
  });

  const startHourNum = form.startHour ? Number(form.startHour) : null;
  const endHourNum = form.endHour ? Number(form.endHour) : null;

  const hours =
    startHourNum !== null && endHourNum !== null && endHourNum > startHourNum
      ? endHourNum - startHourNum
      : 0;

  const cost = hours * hourlyRate;

  const openCreateModal = () => {
    setForm({ date: "", startHour: "", endHour: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const { mutate: createSlot, isPending: creating } = useMutation({
    mutationFn: (payload: any) => handleCreateSlot(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots", username] });
      queryClient.invalidateQueries({
        queryKey: ["slotsStats", provider.id],
      });
      closeModal();
    },
    onError: () => {},
  });

  const handleSubmit = () => {
    const { date, startHour, endHour } = form;

    const start = new Date(
      Date.UTC(
        Number(date.slice(0, 4)),
        Number(date.slice(5, 7)) - 1,
        Number(date.slice(8, 10)),
        Number(startHour)
      )
    );

    const end = new Date(
      Date.UTC(
        Number(date.slice(0, 4)),
        Number(date.slice(5, 7)) - 1,
        Number(date.slice(8, 10)),
        Number(endHour)
      )
    );

    const payload = {
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      cost,
    };

    createSlot(payload);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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

        <SlotSection username={username} openCreateModal={openCreateModal} />
      </div>

      {isModalOpen && (
        <SlotModal
          mode="create"
          onClose={closeModal}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          hours={hours}
          cost={cost}
          hourlyRate={hourlyRate}
        />
      )}
    </div>
  );
}
