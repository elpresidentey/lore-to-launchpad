import { UserPlus, Search, MessageCircle, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Verify",
    description: "Create your account and verify your identity for a secure experience.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Search,
    title: "Search or List",
    description: "Tenants search for homes. Landlords list their properties with ease.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: MessageCircle,
    title: "Connect & Chat",
    description: "Message directly, schedule viewings, and discuss terms without agents.",
    color: "from-accent to-accent/80",
  },
  {
    icon: CheckCircle,
    title: "Book & Pay",
    description: "Secure your home with our integrated payment and escrow system.",
    color: "from-primary to-secondary",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Find your home or list your property in four easy steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" 
            style={{ 
              top: '5rem',
              left: '10%',
              right: '10%',
            }} 
          />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto shadow-medium group-hover:scale-110 transition-all duration-300 relative z-10`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg z-20">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
