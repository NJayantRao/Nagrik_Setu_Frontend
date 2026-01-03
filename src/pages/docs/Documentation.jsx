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
  CircleQuestionMark,
} from "lucide-react";

const sections = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "why-nagrik-setu", label: "Why Nagrik Setu", icon: CircleQuestionMark },
  { id: "getting-started", label: "Getting Started", icon: Rocket },
  { id: "filing-complaint", label: "Filing a Complaint", icon: FileText },
  { id: "user-roles", label: "User Roles", icon: Users },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
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
      "Resolution time depends on the nature of the issue and the concerned department. While some complaints may be resolved quickly, others may take longer due to on-ground verification or resource requirements. You can track the progress of your complaint in real time from the My Complaints section.",
  },
  {
    question: "Can I file multiple complaints at once?",
    answer:
      "Yes, you can file multiple complaints. Each complaint is tracked separately with its own unique ID. We recommend filing separate complaints for unrelated issues for better tracking and resolution.",
  },
  {
    question: "What documents or evidence do I need to attach?",
    answer:
      "Upload photos that support your complaint, such as images of the issue. Providing clear evidence helps authorities understand and address the issue more effectively.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes, we take data privacy seriously. Your personal information is protected under our privacy policy and relevant data protection laws. Only authorized personnel handling your complaint can access your details.",
  },
  {
    question: "Will my complaint be visible to the public?",
    answer:
      "No, Complaints are not publicly visible. Only authorized authorities can view complaint details required for resolution.",
  },
  {
    question: "Can I edit my complaint after submitting it?",
    answer:
      "Currently, complaints cannot be edited once submitted. Please review all details carefully before final submission.",
  },
  {
    question: "What types of issues can I report?",
    answer:
      "You can report public service issues such as road and infrastructure problems, water supply and sanitation issues, electricity and streetlight problems, and other civic service concerns.",
  },
  {
    question: "Will I receive updates about my complaint?",
    answer:
      "Yes, You can track updates and status changes directly from the My Complaints section. Important updates may also be communicated via email.",
  },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
                <div
                  className="w-10 h-10 rounded-xl bg-[#193366] flex items-center justify-center"
                  onClick={() => {
                    navigate("/");
                  }}
                >
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
                  className="gap-2 flex items-center cursor-pointer"
                >
                  <ArrowLeft className="w-6 h-6 hidden sm:inline" />
                  <span className="hidden sm:inline font-semibold">
                    Back to Home
                  </span>
                </button>
              </Link>
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
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10  p-2 rounded-lg outline-0 focus:outline-2 focus:outline-black"
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
                        ? "bg-[#193366] text-[#ffffff]"
                        : "text-[#676f7e] hover:bg-[#193366] hover:text-[#ffffff]"
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
            className="fixed inset-0 bg-[#f9fafb]/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-12 overflow-x-hidden">
          <div className="max-w-3xl mx-auto w-full">
            {/* Introduction */}
            <section id="introduction" className="mb-10 scroll-mt-24">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#141d2e] mb-6 text-center sm:text-left">
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
            </section>

            {/* Why Nagrik Setu */}
            <section id="why-nagrik-setu" className="mb-16 scroll-mt-24">
              <div className="flex gap-2">
                <AlertTriangle className="h-8 w-8 text-[#193366]" />
                <h2 className="font-heading text-3xl font-bold text-[#141d2e] mb-6">
                  Why Nagrik Setu
                </h2>
              </div>

              <p className="text-[#676f7e] mb-8 leading-relaxed">
                Before understanding the need for{" "}
                <strong className="text-[#141d2e]">Nagrik Setu</strong>, it is
                important to examine how grievance and complaint systems
                currently function across India and why they often fail
                citizens.
              </p>

              <div className="flex flex-col gap-3 mb-5">
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xl">
                      1️⃣
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Identifying the Concerned Authority
                    </h3>
                  </div>
                  <p className="text-[#676f7e] mb-4 leading-relaxed">
                    In many{" "}
                    <strong className="text-[#141d2e]">
                      rural and under-developed regions
                    </strong>
                    , the first challenge itself is identifying <em>who</em> is
                    responsible for a problem.
                  </p>
                  {/* Content */}
                  <ul className="list-disc ml-6 space-y-2 text-[#141d2e]">
                    <li>
                      <strong className="text-[#141d2e]">
                        Potholes / Damaged roads
                      </strong>{" "}
                      - Public Works Department (PWD) or Municipal Engineering
                    </li>
                    <li>
                      <strong className="text-[#141d2e]">
                        Garbage overflow
                      </strong>{" "}
                      - Sanitation Department or Urban Local Body
                    </li>
                    <li>
                      <strong className="text-[#141d2e]">
                        Streetlights not working
                      </strong>{" "}
                      - Electricity Department or Municipal Corporation
                    </li>
                  </ul>
                  <p className="text-[#676f7e] mt-4 leading-relaxed">
                    Once the authority is identified, citizens are often
                    required to
                    <strong className="text-[#141d2e]">
                      {" "}
                      physically visit government offices
                    </strong>
                    , stand in long queues, and navigate unclear
                    procedures—making the process frustrating, time-consuming,
                    and discouraging.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xl">
                      2️⃣
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Toll-Free Helpline Numbers
                    </h3>
                  </div>

                  <p className="text-[#676f7e] mb-4 leading-relaxed">
                    In{" "}
                    <strong className="text-[#141d2e]">
                      sub-urban and urban areas
                    </strong>
                    , grievance reporting is sometimes possible via helpline
                    numbers.
                  </p>

                  {/* Content */}
                  <ul className="list-disc ml-6 space-y-2 text-[#141d2e]">
                    <li>Calls often go unanswered</li>
                    <li>Waiting times are long</li>
                    <li>No proper complaint tracking</li>
                    <li>Citizens rarely receive resolution updates</li>
                  </ul>

                  <p className="text-[#676f7e] mt-4 leading-relaxed">
                    This results in complaints being raised—but not effectively
                    resolved.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xl">
                      3️⃣
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Fragmented Websites & Apps
                    </h3>
                  </div>

                  <p className="text-[#676f7e] mb-4 leading-relaxed">
                    Some{" "}
                    <strong className="text-[#141d2e]">developed cities</strong>{" "}
                    provide online grievance portals or mobile applications for
                    public issue reporting.
                  </p>

                  {/* Content */}
                  <ul className="list-disc ml-6 space-y-2 text-[#141d2e]">
                    <li>Restricted to specific cities or regions</li>
                    <li>
                      Mainly focused on sanitation or garbage-related issues
                    </li>
                    <li>No unified platform for all public grievances</li>
                    <li>Many complaints remain unaddressed or unresolved</li>
                  </ul>
                </div>
              </div>

              {/* Solution Highlight */}
              <div className="p-5 bg-[#edf0f3] border border-[#d0d7de] rounded-lg">
                <h3 className="font-semibold text-lg text-[#141d2e] mb-2">
                  🌉 How Nagrik Setu Solves This
                </h3>

                <p className="text-[#676f7e] leading-relaxed">
                  <strong className="text-[#141d2e]">Nagrik Setu</strong>{" "}
                  provides a single, unified, and transparent platform where
                  citizens can report any public service issue without worrying
                  about departments, track complaint status in real time, and
                  ensure accountability through structured workflows.
                </p>

                <p className="text-[#676f7e] mt-3 leading-relaxed">
                  It eliminates fragmentation, reduces dependency on physical
                  visits or unanswered helplines, and brings grievance redressal
                  into a
                  <strong className="text-[#141d2e]">
                    {" "}
                    citizen-first digital ecosystem
                  </strong>
                  .
                </p>
              </div>
            </section>
            <div className="p-4 bg-[#6293c5]/2 border border-[#749ac1] rounded-lg flex gap-3 mb-8">
              <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
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

            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-[#141d2e] mb-4 flex items-center gap-3">
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
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Logout
                    </h3>
                  </div>
                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      Click the{" "}
                      <strong className="text-[#141d2e]">
                        profile icon (mobile)
                      </strong>{" "}
                      or open the{" "}
                      <strong className="text-[#141d2e]">
                        sidebar (desktop)
                      </strong>
                      .
                    </li>
                    <li>
                      Select <strong className="text-[#141d2e]">Logout</strong>{" "}
                      from the menu.
                    </li>
                    <li>You will be securely signed out of your account.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-[#e0e6eb] bg-white p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#193366] text-white flex items-center justify-center font-bold text-lg">
                      6
                    </div>
                    <h3 className="text-lg font-semibold text-[#141d2e]">
                      Delete Account
                    </h3>
                  </div>
                  {/* Content */}
                  <ol className="list-decimal ml-12 space-y-2 text-[#676f7e] text-lg leading-relaxed">
                    <li>
                      Click the{" "}
                      <strong className="text-[#141d2e]">
                        profile icon (mobile)
                      </strong>{" "}
                      or open the{" "}
                      <strong className="text-[#141d2e]">
                        sidebar (desktop)
                      </strong>
                      .
                    </li>
                    <li>
                      Select{" "}
                      <strong className="text-[#141d2e]">Delete Account</strong>{" "}
                      from the menu.
                    </li>
                    <li>
                      Confirm your action to permanently delete your account.
                    </li>
                  </ol>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Note</h4>
                    <p className="text-sm text-muted-foreground">
                      Account deletion is permanent and will remove all
                      associated data, including complaints and history.
                    </p>
                  </div>
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

              <div className="mb-4 flex justify-center">
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

            {/* User Roles */}
            <section id="user-roles" className="mb-16 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-[#141d2e] mb-6 flex items-center gap-3">
                <Users className="w-10 h-10 text-[141d2e]" />
                User Roles
              </h2>
              <p className="text-[#676f7e] mb-8">
                Nagrik Setu has different user roles with specific permissions
                and capabilities.
              </p>

              <div className="grid gap-6">
                <div className="border-border overflow-hidden shadow-lg rounded-xl">
                  <div className="h-2 bg-blue-500" />
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3">
                      👤 Citizen
                    </h3>
                    <p className="text-[#000000] mb-4">
                      Regular users who file and track complaints.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> File
                        new complaints
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Track complaint status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View
                        complaint history
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Provide feedback on resolution
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Escalate unresolved complaints
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-border overflow-hidden shadow-lg rounded-xl">
                  <div className="h-2 bg-green-500" />
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3">
                      🏛️ Authority(Admins)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Government officials who handle and resolve complaints.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View
                        assigned complaints
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Update complaint status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Add
                        resolution notes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Transfer complaints to other departments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> View
                        department analytics
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-5 scroll-mt-24">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mb-8">
                Find answers to common questions about using Nagrik Setu.
              </p>

              {faqs.map((ele, idx) => {
                return (
                  <details
                    key={idx}
                    className="group collapse bg-base-100 border-b border-[#e0e6eb] rounded-sm shadow-sm"
                  >
                    <summary className="collapse-title font-semibold flex items-center justify-between cursor-pointer">
                      <span>{ele.question}</span>

                      {/* Down Arrow */}
                      <svg
                        className="h-4 w-4 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>

                    <div className="collapse-content text-sm text-[#676f7e] font-semibold">
                      {ele.answer}
                    </div>
                  </details>
                );
              })}
            </section>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  {" "}
                  Privacy & Usage Note
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nagrik Setu collects only the information required to process
                  complaints and improve public service delivery.
                  <br /> User data is handled responsibly and in accordance with
                  applicable data protection standards.
                </p>
              </div>
            </div>
          </div>
          <footer className="mt-16 border-t border-[#193366] bg-gradient-to-r from-[#193366] to-[#1f3f7a]">
            <div className="max-w-3xl mx-auto px-6 py-6 text-center">
              <p className="text-sm font-semibold tracking-wide text-white">
                © {new Date().getFullYear()} Nagrik Setu
              </p>

              <p className="text-sm text-[#c7d2e0] mt-1">
                A citizen-centric grievance redressal platform for transparent
                governance
              </p>

              <p className="text-xs text-[#9fb4d6] mt-2">
                Need help?{" "}
                <span className="underline cursor-pointer hover:text-white">
                  Visit the FAQs
                </span>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
