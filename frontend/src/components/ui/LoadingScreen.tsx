import { Calendar } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center pb-[10vh] sm:justify-center sm:pb-0">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-8 h-8 text-foreground" />
          <span className="text-2xl font-bold text-foreground">MeetBook</span>
        </div>{" "}
        <div className="flex gap-1">
          {[0, 0.3, 0.6].map((delay, i) => (
            <div
              key={i}
              className="w-[0.46rem] h-[0.46rem] bg-black rounded-full animate-pulse"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
