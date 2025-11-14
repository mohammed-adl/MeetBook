import { Plus, CalendarIcon } from "lucide-react";
import { Slot } from "@/types/provider";

interface SlotSectionProps {
  slots: Slot[];
  openCreateModal: () => void;
  openEditModal: (slot: Slot) => void;
  deleteSlot: (id: number) => void;
}

export default function SlotSection({
  slots,
  openCreateModal,
  openEditModal,
  deleteSlot,
}: SlotSectionProps) {
  return (
    <section className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
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

      {/* Content */}
      <div className="p-6">
        {slots.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-4">
            {slots.map((slot) => (
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
