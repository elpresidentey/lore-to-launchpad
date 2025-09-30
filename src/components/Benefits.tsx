import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Clock, BadgeCheck } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "For Tenants",
    subtitle: "Affordable Housing",
    description: "Skip the agent fees and find verified, affordable homes directly from landlords.",
    gradient: "from-primary to-primary/80",
  },
  {
    icon: Clock,
    title: "For Landlords",
    subtitle: "Self-Service Control",
    description: "Manage your properties on your own terms with full control and transparency.",
    gradient: "from-secondary to-secondary/80",
  },
  {
    icon: BadgeCheck,
    title: "For Everyone",
    subtitle: "Trust & Security",
    description: "Verified users, secure payments, and honest reviews create a trustworthy marketplace.",
    gradient: "from-accent to-accent/80",
  },
];

export const Benefits = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-muted/50 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Landlords & Tenants
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Remove the middleman and experience direct, transparent rental transactions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="border-0 shadow-large hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${benefit.gradient}`} />
              <CardContent className="pt-8 pb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  {benefit.title}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.subtitle}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
