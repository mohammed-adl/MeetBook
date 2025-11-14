"use client";

import { X } from "lucide-react";

export interface SlotFormState {
  date: string;
  startHour: string;
  endHour: string;
}

interface SlotModalProps {
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: () => void;
  form: SlotFormState;
  setForm: React.Dispatch<React.SetStateAction<SlotFormState>>;
  hours: number;
  cost: number;
  hourlyRate: number;
}

export default function SlotModal({
  mode,
  onClose,
  onSubmit,
  form,
  setForm,
  hours,
  cost,
  hourlyRate,
}: SlotModalProps) {
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
          {/* DATE */}
          <div>
            <label className="block text-sm font-medium mb-2">Date (UTC)</label>
            <input
              type="date"
              placeholder="Select date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>

          {/* HOURS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Hour
              </label>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="0–23"
                value={form.startHour}
                onChange={(e) =>
                  setForm({ ...form, startHour: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Hour</label>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="0–23"
                value={form.endHour}
                onChange={(e) => setForm({ ...form, endHour: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>

          {/* COST SUMMARY */}
          <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4 space-y-1">
            <p>UTC times</p>
            <p>
              Hourly rate:{" "}
              <strong className="text-card-foreground">${hourlyRate}</strong>
            </p>
            <p>
              Hours: <strong className="text-card-foreground">{hours}</strong>
            </p>
            <p>
              Estimated cost:{" "}
              <strong className="text-card-foreground">${cost}</strong>
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
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
