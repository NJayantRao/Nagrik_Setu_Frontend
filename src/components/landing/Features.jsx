import {
  FileWarning,
  Search,
  Bell,
  Shield,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: FileWarning,
    title: "Easy Reporting",
    description:
      "Submit complaints with photos and detailed descriptions in just a few taps.",
  },
  {
    icon: Search,
    title: "Real-time Tracking",
    description:
      "Track the status of your complaints in real-time with transparent updates.",
  },

  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is kept safe with strong security and privacy practices.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "View comprehensive analytics on civic issues and resolution metrics.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Make a Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed to streamline civic engagement and ensure
            your voice reaches the right authorities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
