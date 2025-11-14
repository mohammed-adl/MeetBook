import { Calendar as CalendarIcon, Clock, DollarSign } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function Stats({ stats }: { stats: any }) {
  const statItems: StatItem[] = [
    { icon: <CalendarIcon />, label: "Total Slots", value: stats.totalSlots },
    { icon: <Clock />, label: "Available", value: stats.availableSlots },
    { icon: <CalendarIcon />, label: "Booked", value: stats.bookedSlots },
    {
      icon: <DollarSign />,
      label: "Confirmed Earnings",
      value: `$${stats.confirmedEarnings}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, idx) => (
        <StatCard
          key={idx}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
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
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
