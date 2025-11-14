"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import Calendar from "@/components/Calendar";

type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  status: "available" | "booked";
  duration: number;
  bookedBy?: string;
};

export default function SlotModal({
  isOpen,
  mode,
  slot,
  onClose,
  onSubmit,
  formData,
  setFormData,
  slots,
  provider,
}: any) {
  // Sync form values when slot changes or modal opens
  useEffect(() => {
    if (slot) {
      const d = new Date(slot.startTime);
      setFormData({
        date: d.toISOString().split("T")[0],
        startTime: new Date(slot.startTime).toTimeString().slice(0, 5),
        endTime: new Date(slot.endTime).toTimeString().slice(0, 5),
      });
    } else {
      // if modal just opened for create, ensure formData is reset
      if (!formData?.date) {
        setFormData({ date: "", startTime: "", endTime: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-3xl w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-card-foreground">
            {mode === "edit" ? "Edit Slot" : "Create New Slot"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: BIG Calendar (now here) */}
          <div>
            <Calendar
              slots={slots}
              selectedDate={formData.date}
              onSelectDate={(date: string) =>
                setFormData({ ...formData, date })
              }
            />
          </div>

          {/* RIGHT: time inputs */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground mb-4">
              <p className="mb-1">
                💡 <strong>Note:</strong> Times will be stored in UTC.
              </p>
              <p>
                Your hourly rate:{" "}
                <strong className="text-card-foreground">
                  ${provider?.hourlyRate?.toFixed?.(2) ?? "0.00"}
                </strong>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => onSubmit(formData)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                {mode === "edit" ? "Update Slot" : "Create Slot"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
