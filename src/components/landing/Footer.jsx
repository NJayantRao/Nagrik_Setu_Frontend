import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Report Issue", href: "#" },
      { label: "Track Complaint", href: "#" },
      { label: "View Statistics", href: "#" },
      { label: "Department Directory", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Feedback", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "RTI Portal", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#193366] text-white w-full">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-[#193366] font-heading font-bold text-xl">
                  N
                </span>
              </div>
              <span className="font-heading font-bold text-xl">
                Nagrik Setu
              </span>
            </div>

            <p className="text-white/70 mb-6 max-w-sm">
              Bridging the gap between citizens and governance. Your platform
              for transparent and efficient civic engagement.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                <span>support@nagriksetu.gov.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © {currentYear} Nagrik Setu. A Government of India Initiative. All
            rights reserved.
          </p>

          <div className="flex items-center gap-1 text-sm font-medium text-white/70">
            <span>Made with</span>
            <span className="text-red-400 font-semibold">♥</span>
            <span>for the citizens of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
