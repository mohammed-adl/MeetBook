// helpers/helpers.ts

// Calculate total minutes between two ISO date strings
export function calculateDuration(start: string, end: string): number {
  return Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000
  );
}

// Earnings based on hourly rate + minutes
export function calculateEarnings(minutes: number, hourlyRate: number): string {
  return (hourlyRate * (minutes / 60)).toFixed(2);
}

// Format YYYY-MM-DD to readable date
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Format ISO date → HH:mm
export function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toTimeString().slice(0, 5);
}

// Generate next slot ID
export function generateNewSlotId(slots: any[]): number {
  return Math.max(...slots.map((s) => s.id), 0) + 1;
}

// Sort slots by date
export function sortSlotsByDate(slots: any[]) {
  return [...slots].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

// Check if a slot overlaps another slot
export function isOverlappingSlot(
  slots: any[],
  newStart: string,
  newEnd: string,
  editingId?: number
): boolean {
  const start = new Date(newStart).getTime();
  const end = new Date(newEnd).getTime();

  return slots.some((slot) => {
    if (slot.id === editingId) return false;

    const s = new Date(slot.startTime).getTime();
    const e = new Date(slot.endTime).getTime();

    return start < e && end > s; // time overlap rule
  });
}

// Group slots by day → { "2024-11-15": [...], "2024-11-16": [...] }
export function groupSlotsByDate(slots: any[]) {
  const grouped: any = {};

  slots.forEach((slot) => {
    const key = slot.startTime.split("T")[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(slot);
  });

  return grouped;
}
