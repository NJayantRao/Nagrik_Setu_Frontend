import { FileText, Send, Clock, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Register & Report",
    description:
      "Create an account and submit your complaint with all relevant details, photos, and location.",
  },
  {
    icon: Send,
    step: "02",
    title: "Auto-Routing",
    description:
      "Your complaint is automatically routed to the concerned department for swift action.",
  },
  {
    icon: Clock,
    step: "03",
    title: "Track Progress",
    description:
      "Monitor real-time updates as your complaint moves through the resolution process.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Get Resolution",
    description:
      "Receive confirmation when your issue is resolved and provide feedback on the service.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Steps to Civic Engagement
          </h2>
          <p className="text-muted-foreground text-lg">
            From reporting an issue to getting it resolved, our streamlined
            process ensures your concerns are addressed efficiently.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative z-10 text-center">
                {/* Icon Container */}
                <div className="w-24 h-24 mx-auto rounded-2xl bg-card border-2 border-border flex flex-col items-center justify-center mb-6 shadow-soft">
                  <span className="text-xs font-bold text-accent mb-1">
                    {step.step}
                  </span>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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

export default HowItWorksSection;
