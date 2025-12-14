import { useState } from "react";
import Layout from "@/components/layout";
import { MoodSelector } from "@/components/mood-selector";
import { HabitTracker } from "@/components/habit-tracker";
import { motion, AnimatePresence } from "framer-motion";
import { SUGGESTIONS } from "@/lib/mock-data";
import { Check, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mood, setMood] = useState(0);
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(false);
  const [screenTime, setScreenTime] = useState<"low" | "medium" | "high">("medium");
  const [isLogged, setIsLogged] = useState(false);
  const { toast } = useToast();

  const handleLog = () => {
    setIsLogged(true);
    toast({
      title: "Check-in Complete",
      description: "Your daily pulse has been recorded.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-8 pt-10">
        
        {/* Header */}
        <header className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {format(new Date(), "EEEE, MMMM d")}
          </p>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Good Morning, User
          </h1>
        </header>

        <AnimatePresence mode="wait">
          {!isLogged ? (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Mood Card */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-heading font-semibold">How are you feeling?</h2>
                  <p className="text-sm text-muted-foreground">Take a moment to check in with yourself.</p>
                </div>
                <MoodSelector value={mood} onChange={setMood} />
              </section>

              {/* Habits Card */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 space-y-6">
                 <div className="space-y-2">
                  <h2 className="text-lg font-heading font-semibold">Daily Habits</h2>
                  <p className="text-sm text-muted-foreground">Quickly track your key factors.</p>
                </div>
                <HabitTracker 
                  sleep={sleep} setSleep={setSleep}
                  exercise={exercise} setExercise={setExercise}
                  screenTime={screenTime} setScreenTime={setScreenTime}
                />
              </section>

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleLog}
                disabled={mood === 0}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold font-heading text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2",
                  mood === 0 
                    ? "bg-muted text-muted-foreground cursor-not-allowed" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20"
                )}
                data-testid="btn-log-day"
              >
                Log Today <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-primary/10 rounded-3xl p-8 text-center space-y-4 border border-primary/20">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/30">
                  <Check className="w-8 h-8" strokeWidth={3} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary-foreground text-foreground">All Set!</h2>
                  <p className="text-muted-foreground">You've tracked your pulse for today.</p>
                </div>
              </div>

              {/* Suggestion Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border-l-4 border-accent space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-heading font-semibold text-lg">Suggestion for you</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  "{SUGGESTIONS[0]}"
                </p>
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-accent/10 text-accent-foreground py-2 rounded-xl text-sm font-medium hover:bg-accent/20 transition-colors">
                    I'll try this
                  </button>
                  <button className="px-4 py-2 text-muted-foreground hover:text-foreground text-sm font-medium">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
