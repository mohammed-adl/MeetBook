export interface Provider {
  id: number;
  name: string;
  email: string;
  hourlyRate: number;
  role: string;
}

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  duration: number;
  status: "available" | "booked";
  bookedBy?: string;
}

export interface FormDataType {
  date: string;
  startTime: string;
  endTime: string;
}
