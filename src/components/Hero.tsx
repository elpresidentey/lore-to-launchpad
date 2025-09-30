import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import { SignupDialog } from "@/components/SignupDialog";

export const Hero = () => {
  const scrollToListings = () => {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Find Your Perfect Home, Without the Fees
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Connect directly with landlords and tenants. No agents. No high fees. Just affordable, transparent renting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-large transition-all duration-300 hover:scale-105"
              onClick={scrollToListings}
            >
              Find a Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <SignupDialog 
              trigger={
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-foreground transition-all duration-300">
                  List Your Property
                </Button>
              }
            />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">0%</div>
              <div className="text-sm md:text-base text-white/80">Agent Fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm md:text-base text-white/80">Direct Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm md:text-base text-white/80">Verified</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
