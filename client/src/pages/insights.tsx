import Layout from "@/components/layout";
import { MOCK_HISTORY, INSIGHTS } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Moon, Smartphone, Sun } from "lucide-react";

const iconMap = {
  Moon: Moon,
  Smartphone: Smartphone,
  Sun: Sun,
};

export default function Insights() {
  const averageMood = (MOCK_HISTORY.reduce((acc, curr) => acc + curr.mood, 0) / MOCK_HISTORY.length).toFixed(1);

  return (
    <Layout>
      <div className="p-6 space-y-8 pt-10">
        <header className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Your Trends
          </p>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Weekly Insights
          </h1>
        </header>

        {/* Main Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-muted-foreground">Average Mood</p>
              <p className="text-3xl font-heading font-bold text-primary">{averageMood}/5</p>
            </div>
            <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
              +5% vs last week
            </div>
          </div>
          
          <div className="h-48 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => val.split('-')[2]} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis 
                  domain={[1, 5]} 
                  tickCount={5} 
                  hide
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(142, 25%, 55%)" 
                  strokeWidth={3} 
                  dot={{ fill: 'white', stroke: 'hsl(142, 25%, 55%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(142, 25%, 55%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pattern Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-semibold px-1">Detected Patterns</h2>
          {INSIGHTS.map((insight, index) => {
            const Icon = iconMap[insight.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border/40 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0 text-foreground">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium font-heading text-foreground">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {insight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
