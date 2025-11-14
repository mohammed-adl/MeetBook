import { Provider, Slot } from "@/types/provider";

export const dummyProvider: Provider = {
  id: 1,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  hourlyRate: 75.0,
  role: "provider",
};

export const dummySlots: Slot[] = [
  {
    id: 1,
    startTime: "2024-11-15T14:00:00Z",
    endTime: "2024-11-15T15:00:00Z",
    status: "available",
    duration: 60,
  },
  {
    id: 2,
    startTime: "2024-11-16T10:00:00Z",
    endTime: "2024-11-16T11:30:00Z",
    status: "available",
    duration: 90,
  },
  {
    id: 3,
    startTime: "2024-11-17T09:00:00Z",
    endTime: "2024-11-17T10:00:00Z",
    status: "booked",
    duration: 60,
    bookedBy: "John Doe",
  },
];
