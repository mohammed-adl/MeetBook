"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export default function SlotModal({
  isOpen,
  mode,
  slot,
  onClose,
  onSubmit,
  setFormData,
}: any) {
  const [local, setLocal] = useState({
    date: "",
    startHour: "",
    endHour: "",
  });
  const { user } = useUserStore();
  const hourlyRate = user?.hourlyRate;

  useEffect(() => {
    if (!isOpen) return;
    if (slot) {
      const d = new Date(slot.startTime);
      const e = new Date(slot.endTime);
      setLocal({
        date: d.toISOString().split("T")[0],
        startHour: String(d.getUTCHours()).padStart(2, "0"),
        endHour: String(e.getUTCHours()).padStart(2, "0"),
      });
    } else {
      setLocal({
        date: "",
        startHour: "",
        endHour: "",
      });
    }
  }, [slot, isOpen]);

  if (!isOpen) return null;

  const startHourNum = local.startHour === "" ? null : Number(local.startHour);
  const endHourNum = local.endHour === "" ? null : Number(local.endHour);

  const hours =
    startHourNum !== null &&
    endHourNum !== null &&
    !isNaN(startHourNum) &&
    !isNaN(endHourNum) &&
    endHourNum > startHourNum
      ? endHourNum - startHourNum
      : 0;

  const cost = hours * (hourlyRate || 0);

  const handleSubmit = () => {
    const { date, startHour, endHour } = local;
    const start = new Date(
      Date.UTC(
        Number(date.split("-")[0]),
        Number(date.split("-")[1]) - 1,
        Number(date.split("-")[2]),
        Number(startHour),
        0,
        0
      )
    );
    const end = new Date(
      Date.UTC(
        Number(date.split("-")[0]),
        Number(date.split("-")[1]) - 1,
        Number(date.split("-")[2]),
        Number(endHour),
        0,
        0
      )
    );
    onSubmit({
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      cost,
    });
    if (typeof setFormData === "function") {
      setFormData({
        date,
        startHour,
        endHour,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-card-foreground">
            {mode === "edit" ? "Edit Slot" : "Create Slot"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Date (YYYY-MM-DD, UTC)
            </label>
            <input
              type="text"
              placeholder="2025-12-01"
              value={local.date}
              onChange={(e) => setLocal({ ...local, date: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Hour (0–23 UTC)
              </label>
              <input
                type="text"
                placeholder="20"
                value={local.startHour}
                onChange={(e) =>
                  setLocal({ ...local, startHour: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                End Hour (0–23 UTC)
              </label>
              <input
                type="text"
                placeholder="22"
                value={local.endHour}
                onChange={(e) =>
                  setLocal({ ...local, endHour: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4 space-y-1">
            <p>Times are stored in UTC.</p>
            <p>
              Hourly rate:{" "}
              <strong className="text-card-foreground">${hourlyRate}</strong>
            </p>
            <p>
              Total hours:{" "}
              <strong className="text-card-foreground">{hours}</strong>
            </p>
            <p>
              Estimated cost:{" "}
              <strong className="text-card-foreground">${cost}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer"
            >
              {mode === "edit" ? "Update Slot" : "Create Slot"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
