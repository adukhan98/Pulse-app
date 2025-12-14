import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import generatedImage from '@assets/generated_images/soft_abstract_calming_gradient_background.png';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex justify-center items-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={generatedImage} 
          alt="Calm Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
      </div>

      <div className="w-full max-w-md relative z-10 p-8 flex flex-col h-screen justify-between py-16">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
            <div className="w-6 h-6 border-2 border-white rounded-full" />
          </div>
          <h1 className="text-5xl font-heading font-bold tracking-tight text-foreground/90">
            Pulse
          </h1>
          <p className="text-xl text-muted-foreground max-w-[280px] leading-relaxed">
            Your daily mirror for mood and habits.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/home" className="w-full bg-foreground text-background py-4 rounded-2xl font-bold font-heading text-lg shadow-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all group cursor-pointer">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-center text-sm text-muted-foreground opacity-60">
            Simple. Private. Calm.
          </p>
        </div>
      </div>
    </div>
  );
}
