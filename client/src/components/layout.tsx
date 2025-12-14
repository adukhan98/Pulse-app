import { Link, useLocation } from "wouter";
import { Home, LineChart, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-border z-50 pb-safe">
          <div className="flex justify-around items-center h-16 px-6">
            <Link href="/home" className={cn(
                "flex flex-col items-center justify-center space-y-1 w-16 transition-colors duration-200 cursor-pointer",
                location === "/home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <Home className={cn("h-6 w-6", location === "/home" && "fill-current")} strokeWidth={location === "/home" ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">Today</span>
            </Link>

            <Link href="/insights" className={cn(
                "flex flex-col items-center justify-center space-y-1 w-16 transition-colors duration-200 cursor-pointer",
                location === "/insights" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <LineChart className={cn("h-6 w-6", location === "/insights" && "fill-current")} strokeWidth={location === "/insights" ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">Insights</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
