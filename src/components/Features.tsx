import { Card, CardContent } from "@/components/ui/card";
import { Home, Shield, MessageSquare, CreditCard, Star, MapPin } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Self-Service Listings",
    description: "Landlords manage properties easily. Tenants search verified, affordable homes.",
  },
  {
    icon: Shield,
    title: "Verified & Secure",
    description: "All users and properties are verified. TLS encryption keeps your data safe.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description: "Chat directly with landlords or tenants. No middlemen, no delays.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Built-in escrow and payment integration for safe, transparent transactions.",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Build trust with honest reviews from real tenants and landlords.",
  },
  {
    icon: MapPin,
    title: "Map Integration",
    description: "Find homes near you with our interactive map and location search.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need, All in One Place
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            House Matters connects you directly, making renting simple, affordable, and transparent.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
            >
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
