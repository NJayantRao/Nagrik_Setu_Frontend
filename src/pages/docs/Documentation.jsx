import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  Rocket,
  FileText,
  MapPin,
  Users,
  HelpCircle,
  Headphones,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const sections = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "getting-started", label: "Getting Started", icon: Rocket },
  { id: "filing-complaint", label: "Filing a Complaint", icon: FileText },
  { id: "tracking-status", label: "Tracking Status", icon: MapPin },
  { id: "user-roles", label: "User Roles", icon: Users },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "support", label: "Support & Contact", icon: Headphones },
];
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

const faqs = [
  {
    question: "How long does it take to resolve a complaint?",
    answer:
      "Resolution time varies based on the complexity and department. Simple complaints may be resolved within 7-14 days, while complex issues may take 30-60 days. You can track the progress in real-time through your dashboard.",
  },
  {
    question: "Can I file multiple complaints at once?",
    answer:
      "Yes, you can file multiple complaints. Each complaint is tracked separately with its own unique ID. We recommend filing separate complaints for unrelated issues for better tracking and resolution.",
  },
  {
    question: "What documents do I need to attach?",
    answer:
      "Required documents vary by complaint type. Generally, you should attach any evidence supporting your complaint (photos, documents, receipts). The system will guide you on mandatory attachments for each category.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes, we take data privacy seriously. Your personal information is protected under our privacy policy and relevant data protection laws. Only authorized personnel handling your complaint can access your details.",
  },
  {
    question: "Can I withdraw a complaint after filing?",
    answer:
      "Yes, you can withdraw a complaint before it reaches the resolved stage. Navigate to your complaint details and select the 'Withdraw Complaint' option. You'll be asked to provide a reason for withdrawal.",
  },
  {
    question: "What if I'm not satisfied with the resolution?",
    answer:
      "If you're dissatisfied with the resolution, you can escalate the complaint within 7 days of receiving the resolution. The escalated complaint will be reviewed by senior officials for further action.",
  },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setSidebarOpen(false);
    }
  };

  const filteredSections = sections.filter((section) =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-[#e0e6eb]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#193366] flex items-center justify-center">
                  <span className="text-[#fbfcfd] font-heading font-bold text-xl">
                    N
                  </span>
                </div>
                <span className="font-heading font-bold text-xl text-[#141d2e] tracking-tight">
                  Nagrik Setu
                </span>
              </div>
              <span className="hidden sm:block text-[#676f7e">|</span>
              <span className="hidden sm:block text-[#676f7e] font-medium">
                Documentation
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/">
                <button
                  variant="ghost"
                  size="sm"
                  className="gap-2 flex items-center"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span className="hidden sm:inline font-semibold">
                    Back to Home
                  </span>
                </button>
              </Link>
              <button
                className="lg:hidden p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 lg:pt-20 flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 lg:top-20 left-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] w-72 bg-background border-r border-border z-40 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 h-full overflow-y-auto">
            Search
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Navigation */}
            <nav className="space-y-1">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-sm">{section.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-12">
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <section id="introduction" className="mb-16 scroll-mt-24">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#141d2e] mb-6">
                Welcome to Nagrik Setu
              </h1>
              <p className="text-lg text-[#676f7e] mb-8 leading-relaxed">
                Nagrik Setu is a citizen-centric grievance redressal platform
                designed to bridge the gap between citizens and government
                authorities by enabling citizens to report, track, and resolve
                public service issues through a transparent and accountable
                digital system.. Our mission is to make public service delivery
                transparent, efficient and accountable.
              </p>

              {/* <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card className="border-border shadow-soft">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">For Citizens</h3>
                    <p className="text-sm text-muted-foreground">
                      File and track complaints easily. Get real-time updates on your grievances.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-soft">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">For Authorities</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage complaints efficiently with our comprehensive dashboard and tools.
                    </p>
                  </CardContent>
                </Card>
              </div> */}

              <div className="p-4 bg-[#edf0f3]/2 border border-[#96a3b0] rounded-lg flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    New to Nagrik Setu?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Start with the Getting Started section below to learn how to
                    create your account and file your first complaint.
                  </p>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-[#141d2e] mb-6 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-[#193366]" />
                Getting Started
              </h2>
              <p className="text-[#676f7e] mb-8">
                Follow these simple steps to create your account and start using
                Nagrik Setu.
              </p>

              <div className="space-y-6">
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Create Your Account
                    </h3>
                  </div>

                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      Click on the{" "}
                      <strong className="text-[#141d2e]">"Login"</strong> button
                      in the navigation bar.
                    </li>
                    <li>
                      On the login page, click Sign Up to create a new user
                      account.
                    </li>
                    <li>
                      Fill in your basic details in the registration form.
                    </li>
                    <li>Create a secure password (8–20 characters).</li>
                    <li>Click Sign Up to complete the registration.</li>
                    <li>
                      A{" "}
                      <strong className="text-[#141d2e]">unique user ID</strong>{" "}
                      will be sent to your registered email address..
                    </li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Login to Your Dashboard
                    </h3>
                  </div>

                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      Click on the{" "}
                      <strong className="text-[#141d2e]">"Login"</strong> button
                      in the navigation bar.
                    </li>
                    <li>
                      Fill in your{" "}
                      <strong className="text-[#141d2e]">unique user ID</strong>
                      and <strong className="text-[#141d2e]">Password</strong>.
                    </li>
                    <li>Click Login to authenticate your account.</li>
                    <li>Access your personalized dashboard.</li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      File a Complaint (Mobile)
                    </h3>
                  </div>

                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      Click the{" "}
                      <strong className="text-[#141d2e]">Plus (+)</strong> icon
                      located at the{" "}
                      <strong className="text-[#141d2e]">
                        bottom-right corner
                      </strong>
                      .
                    </li>
                    <li>
                      The{" "}
                      <strong className="text-[#141d2e]">
                        Complaint Registration Form
                      </strong>{" "}
                      will appear.
                    </li>
                    <li>
                      Enter the{" "}
                      <strong className="text-[#141d2e]">
                        complaint title
                      </strong>{" "}
                      and detailed description.
                    </li>
                    <li>
                      <strong className="text-[#141d2e]">
                        Upload an image
                      </strong>{" "}
                      as supporting evidence.
                    </li>
                    <li>
                      Select the{" "}
                      <strong className="text-[#141d2e]">
                        relevant department
                      </strong>
                      .
                    </li>
                    <li>
                      Click <strong className="text-[#141d2e]">Register</strong>{" "}
                      to submit the complaint.
                    </li>
                    <li>
                      A{" "}
                      <strong className="text-[#141d2e]">
                        unique complaint ID
                      </strong>{" "}
                      will be generated for tracking.
                    </li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      File a Complaint (Desktop)
                    </h3>
                  </div>

                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      From the sidebar, click on{" "}
                      <strong className="text-[#141d2e]">
                        Raise Complaint
                      </strong>
                      .
                    </li>
                    <li>
                      The{" "}
                      <strong className="text-[#141d2e]">
                        Complaint Registration Form
                      </strong>{" "}
                      will appear.
                    </li>
                    <li>
                      Enter the{" "}
                      <strong className="text-[#141d2e]">
                        complaint title
                      </strong>{" "}
                      and detailed description.
                    </li>
                    <li>
                      <strong className="text-[#141d2e]">
                        Upload an image
                      </strong>{" "}
                      as supporting evidence.
                    </li>
                    <li>
                      Select the{" "}
                      <strong className="text-[#141d2e]">
                        relevant department
                      </strong>
                      .
                    </li>
                    <li>
                      Click <strong className="text-[#141d2e]">Register</strong>{" "}
                      to submit the complaint.
                    </li>
                    <li>
                      A{" "}
                      <strong className="text-[#141d2e]">
                        unique complaint ID
                      </strong>{" "}
                      will be generated for tracking.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Filing a Complaint */}
            <section id="filing-complaint" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                Filing a Complaint
              </h2>
              <p className="text-muted-foreground mb-8">
                Learn how to file a complaint step by step. The process is
                simple and takes less than 5 minutes.
              </p>

              <div className="mb-8 flex justify-center">
                <ul className="timeline timeline-horizontal gap-6">
                  {/* Filed */}
                  <li className="flex-1">
                    <div className="timeline-start timeline-box bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                      Filed
                    </div>
                    <div className="timeline-middle text-blue-600">
                      <CheckIcon />
                    </div>
                    <hr className="bg-blue-300" />
                  </li>

                  {/* Acknowledged */}
                  <li className="flex-1">
                    <hr className="bg-indigo-300" />
                    <div className="timeline-start timeline-box bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
                      Acknowledged
                    </div>
                    <div className="timeline-middle text-indigo-600">
                      <CheckIcon />
                    </div>
                    <hr className="bg-indigo-300" />
                  </li>

                  {/* In Progress */}
                  <li className="flex-1">
                    <hr className="bg-yellow-300" />
                    <div className="timeline-start timeline-box bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold">
                      In&nbsp;Progress
                    </div>
                    <div className="timeline-middle text-yellow-600">
                      <CheckIcon />
                    </div>
                    <hr className="bg-yellow-300" />
                  </li>

                  {/* Resolved */}
                  <li className="flex-1">
                    <hr className="bg-green-300" />
                    <div className="timeline-start timeline-box bg-green-50 border border-green-200 text-green-700 font-semibold">
                      Resolved
                    </div>
                    <div className="timeline-middle text-green-600">
                      <CheckIcon />
                    </div>
                    <hr className="bg-green-300" />
                  </li>

                  {/* Rejected */}
                  <li className="flex-1">
                    <hr className="bg-red-300" />
                    <div className="timeline-start timeline-box bg-red-50 border border-red-200 text-red-700 font-semibold">
                      Rejected
                    </div>
                    <div className="timeline-middle text-red-600">
                      <CheckIcon />
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Pro Tip
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You can track the status of all your complaints from the My
                    Complaints section, accessible via the profile icon on
                    mobile.
                  </p>
                </div>
              </div>
            </section>

            {/* Tracking Status */}
            {/* <section id="tracking-status" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                Tracking Complaint Status
              </h2>
              <p className="text-muted-foreground mb-8">
                Stay informed about your complaint's progress with our real-time tracking system.
              </p>

              <Card className="border-border mb-8">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-lg mb-4">Complaint Status Stages</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-foreground">Pending</h5>
                        <p className="text-sm text-muted-foreground">
                          Complaint has been submitted and is awaiting review by the concerned department.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-foreground">In Progress</h5>
                        <p className="text-sm text-muted-foreground">
                          Complaint has been assigned to an officer and work is underway.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-foreground">Resolved</h5>
                        <p className="text-sm text-muted-foreground">
                          The issue has been addressed and the complaint is marked as resolved.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-foreground">Rejected</h5>
                        <p className="text-sm text-muted-foreground">
                          Complaint could not be processed. Reason will be provided in the details.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-3">Track by Complaint ID</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your complaint ID in the tracking section to view the current status, 
                      assigned officer details, and timeline.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-3">SMS/Email Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive automatic notifications on your registered mobile/email whenever 
                      there's an update on your complaint.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section> */}

            {/* User Roles */}
            {/* <section id="user-roles" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                User Roles
              </h2>
              <p className="text-muted-foreground mb-8">
                Nagrik Setu has different user roles with specific permissions and capabilities.
              </p>

              <div className="grid gap-6">
                <Card className="border-border overflow-hidden">
                  <div className="h-2 bg-blue-500" />
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3">👤 Citizen</h3>
                    <p className="text-muted-foreground mb-4">
                      Regular users who file and track complaints.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> File new complaints
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Track complaint status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View complaint history
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Provide feedback on resolution
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Escalate unresolved complaints
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border overflow-hidden">
                  <div className="h-2 bg-green-500" />
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3">🏛️ Authority/Staff</h3>
                    <p className="text-muted-foreground mb-4">
                      Government officials who handle and resolve complaints.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View assigned complaints
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Update complaint status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Add resolution notes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Transfer complaints to other departments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View department analytics
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border overflow-hidden">
                  <div className="h-2 bg-purple-500" />
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3">⚙️ Administrator</h3>
                    <p className="text-muted-foreground mb-4">
                      System administrators with full access to manage the platform.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Manage all complaints
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Manage users and staff
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View system-wide analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Configure departments and categories
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Generate reports
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section> */}

            {/* FAQs */}
            {/* <section id="faqs" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mb-8">
                Find answers to common questions about using Nagrik Setu.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section> */}

            {/* Support */}
            {/* <section id="support" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Headphones className="w-8 h-8 text-primary" />
                Support & Contact
              </h2>
              <p className="text-muted-foreground mb-8">
                Need help? Our support team is here to assist you.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="border-border text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Headphones className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Helpline</h4>
                    <p className="text-primary font-semibold">1800-XXX-XXXX</p>
                    <p className="text-xs text-muted-foreground mt-1">Toll-free, 24/7</p>
                  </CardContent>
                </Card>

                <Card className="border-border text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                    <p className="text-primary font-semibold text-sm">support@nagriksetu.gov.in</p>
                    <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                  </CardContent>
                </Card>

                <Card className="border-border text-center sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Visit Us</h4>
                    <p className="text-sm text-muted-foreground">
                      Nagrik Setu Office<br />
                      Government Complex, Sector 1
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg">
                <h4 className="font-heading font-semibold text-lg mb-4">Office Hours</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Monday - Friday</p>
                    <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Saturday</p>
                    <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="font-medium text-foreground">Sunday & Public Holidays</p>
                    <p className="text-muted-foreground">Closed (Helpline available)</p>
                  </div>
                </div>
              </div>
            </section> */}

            {/* Footer */}
            <div className="text-center py-8 border-t border-border">
              <p className="text-muted-foreground text-sm">
                Can't find what you're looking for?{" "}
                <a href="#support" className="text-primary hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
