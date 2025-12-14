import { subDays, format } from "date-fns";

export type MoodEntry = {
  date: string;
  mood: number; // 1-5
  note?: string;
  sleep: number; // hours
  exercise: boolean;
  screenTime: "low" | "medium" | "high";
};

export const MOCK_HISTORY: MoodEntry[] = Array.from({ length: 14 }).map((_, i) => {
  const date = subDays(new Date(), 13 - i);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  // Simulate some patterns: better mood on weekends, better mood with more sleep
  const baseSleep = isWeekend ? 8 : 6.5;
  const sleep = Math.min(10, Math.max(4, baseSleep + (Math.random() * 2 - 1)));
  const exercise = isWeekend || Math.random() > 0.6;
  
  let mood = 3;
  if (sleep > 7) mood += 1;
  if (exercise) mood += 0.5;
  if (Math.random() > 0.8) mood -= 1; // Random bad day
  
  return {
    date: format(date, "yyyy-MM-dd"),
    mood: Math.min(5, Math.max(1, Math.round(mood))),
    sleep: Number(sleep.toFixed(1)),
    exercise,
    screenTime: Math.random() > 0.5 ? "medium" : Math.random() > 0.5 ? "high" : "low",
  };
});

export const INSIGHTS = [
  {
    title: "Sleep Pattern",
    description: "You tend to feel 20% better on days you sleep more than 7 hours.",
    icon: "Moon"
  },
  {
    title: "Screen Time",
    description: "Low mood days often follow high screen time evenings.",
    icon: "Smartphone"
  },
  {
    title: "Weekend Glow",
    description: "Your mood is consistently higher on Saturdays.",
    icon: "Sun"
  }
];

export const SUGGESTIONS = [
  "Try going to bed 30 minutes earlier tonight.",
  "A 10-minute walk could help reset your mood.",
  "Consider a screen-free 30 minutes before bed.",
];
