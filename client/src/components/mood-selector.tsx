import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Frown, Meh, Smile } from "lucide-react";

interface MoodSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  const moods = [
    { level: 1, label: "Rough", color: "bg-red-100 text-red-600 border-red-200" },
    { level: 2, label: "Low", color: "bg-orange-100 text-orange-600 border-orange-200" },
    { level: 3, label: "Okay", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
    { level: 4, label: "Good", color: "bg-green-100 text-green-600 border-green-200" },
    { level: 5, label: "Great", color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center w-full px-2">
        {moods.map((m) => {
          const isSelected = value === m.level;
          return (
            <button
              key={m.level}
              onClick={() => onChange(m.level)}
              className="group relative flex flex-col items-center focus:outline-none"
              data-testid={`btn-mood-${m.level}`}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isSelected ? 1.1 : 1,
                  y: isSelected ? -5 : 0,
                }}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-colors duration-300 shadow-sm",
                  isSelected 
                    ? m.color 
                    : "bg-white border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <span className="text-xl font-bold font-heading">{m.level}</span>
              </motion.div>
              <span className={cn(
                "text-[10px] font-medium mt-2 transition-colors duration-200 absolute -bottom-5",
                isSelected ? "text-foreground font-semibold" : "text-muted-foreground opacity-0 group-hover:opacity-100"
              )}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
