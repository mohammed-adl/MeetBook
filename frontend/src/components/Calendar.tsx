"use client";

import { useState } from "react";

interface CalendarProps {
  slots?: any; // optional
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function Calendar({
  slots,
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[] = [];

  // blank days first
  for (let i = 0; i < firstDay; i++) weeks.push(null);

  // month days
  for (let d = 1; d <= daysInMonth; d++) weeks.push(d);

  const isSelected = (d: number) => {
    if (!selectedDate) return false;
    const sel = new Date(selectedDate);
    return (
      sel.getFullYear() === year &&
      sel.getMonth() === month &&
      sel.getDate() === d
    );
  };

  const selectDay = (d: number) => {
    const date = new Date(year, month, d);
    onSelectDate(date.toISOString().slice(0, 10)); // YYYY-MM-DD
  };

  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="px-2 py-1 rounded bg-gray-200"
        >
          ←
        </button>

        <div className="font-semibold text-lg">
          {current.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </div>

        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="px-2 py-1 rounded bg-gray-200"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((d, i) =>
          d === null ? (
            <div key={i}></div>
          ) : (
            <button
              key={i}
              onClick={() => selectDay(d)}
              className={`p-2 rounded text-sm ${
                isSelected(d)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}
