import { Button } from "@/components/ui/button";
import { SignupDialog } from "@/components/SignupDialog";

export const CTA = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="cta" className="py-24 px-4 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-10" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Rental Experience?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Join House Matters today and discover a better way to rent. No fees, no hassle, just homes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <SignupDialog />
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-6 border-2 transition-all duration-300 hover:scale-105"
              onClick={scrollToTop}
            >
              Learn More
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Available in Lagos, Abuja & Port Harcourt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>100% Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Zero Agent Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
