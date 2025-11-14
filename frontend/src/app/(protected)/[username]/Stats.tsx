import { Calendar as CalendarIcon, Clock, DollarSign } from "lucide-react";
import { handleGetSlotsStats } from "@/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function Stats() {
  const user = useUserStore((state) => state.user);
  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["slotsStats", userId],
    queryFn: () => handleGetSlotsStats(),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const slots = data?.slots;

  const stats = {
    totalSlots: slots?.totalSlots,
    availableSlots: slots?.availableSlots,
    bookedSlots: slots?.bookedSlots,
    Earnings: 0,
  };

  const statItems: StatItem[] = [
    { icon: <CalendarIcon />, label: "Total Slots", value: stats.totalSlots },
    { icon: <Clock />, label: "Available", value: stats.availableSlots },
    { icon: <CalendarIcon />, label: "Booked", value: stats.bookedSlots },
    {
      icon: <DollarSign />,
      label: "Earnings",
      value: `$${stats.Earnings}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, idx) => (
        <StatCard key={idx} {...item} />
      ))}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </section>
  );
}
