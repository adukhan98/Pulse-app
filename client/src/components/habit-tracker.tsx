import { motion } from "framer-motion";
import { Moon, Dumbbell, Smartphone } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface HabitTrackerProps {
  sleep: number;
  setSleep: (val: number) => void;
  exercise: boolean;
  setExercise: (val: boolean) => void;
  screenTime: "low" | "medium" | "high";
  setScreenTime: (val: "low" | "medium" | "high") => void;
}

export function HabitTracker({
  sleep,
  setSleep,
  exercise,
  setExercise,
  screenTime,
  setScreenTime,
}: HabitTrackerProps) {
  return (
    <div className="space-y-6">
      {/* Sleep Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Moon className="w-4 h-4" />
            <Label className="text-sm font-medium">Sleep</Label>
          </div>
          <span className="text-sm font-heading font-bold text-foreground">{sleep} hrs</span>
        </div>
        <Slider
          value={[sleep]}
          onValueChange={(vals) => setSleep(vals[0])}
          max={12}
          step={0.5}
          className="py-2"
          data-testid="slider-sleep"
        />
      </div>

      <div className="h-px bg-border/50" />

      {/* Exercise Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Dumbbell className="w-4 h-4" />
          <Label className="text-sm font-medium">Exercise</Label>
        </div>
        <Switch
          checked={exercise}
          onCheckedChange={setExercise}
          data-testid="switch-exercise"
        />
      </div>

      <div className="h-px bg-border/50" />

      {/* Screen Time Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Smartphone className="w-4 h-4" />
          <Label className="text-sm font-medium">Screen Time</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["low", "medium", "high"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setScreenTime(level)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border",
                screenTime === level
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:bg-primary/5"
              )}
              data-testid={`btn-screentime-${level}`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
