// src/components/ThisIsHowWeDoIt.jsx
import React from "react";
import {
  Dumbbell,
  Clock,
  ClipboardList,
  CreditCard,
  Rocket,
  ChevronRight,
} from "lucide-react";

/**
 * ThisIsHowWeDoIt — compact variant with arrows on steps
 * - Reduced vertical spacing and tighter step cards
 * - Arrow icon (ChevronRight) added to each step
 * - Testimonials unchanged (mobile: visible; desktop: slide-up on hover)
 *
 * Paste this file as /src/components/ThisIsHowWeDoIt.jsx
 */

const ACCENT = "#f5c400";

const ThisIsHowWeDoIt = () => {
  const handleScrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    {
      icon: <Dumbbell className="w-8 h-8" style={{ color: ACCENT }} />,
      title: "Choose Program",
      description: "Pick your goal and select the perfect program.",
      onClick: handleScrollToPricing,
    },
    {
      icon: <Clock className="w-8 h-8" style={{ color: ACCENT }} />,
      title: "Select Time",
      description: "Choose a slot that fits your schedule.",
    },
    {
      icon: <ClipboardList className="w-8 h-8" style={{ color: ACCENT }} />,
      title: "Submit Details",
      description: "Fill a quick form so we can personalize your plan.",
    },
    {
      icon: <CreditCard className="w-8 h-8" style={{ color: ACCENT }} />,
      title: "Complete Payment",
      description: "Secure checkout to confirm and reserve your spot.",
    },
    {
      icon: <Rocket className="w-8 h-8" style={{ color: ACCENT }} />,
      title: "Start Training",
      description: "You’re in — follow the plan and track progress.",
    },
  ];

  // Testimonials per image
  const sessionImages = [
    {
      src: "/session1.jpeg",
      quote: "The coach tailored everything to my schedule — I lost 9 kg in 2 months.",
      author: "Sita Sharma",
      role: "Working mom",
    },
    {
      src: "/session2.jpeg",
      quote: "Compact sessions, big results. Weekly check-ins kept me consistent.",
      author: "Rajan Thapa",
      role: "Software Engineer",
    },
    {
      src: "/session3.jpeg",
      quote: "I never liked workouts before — now I do them daily. Nutrition tips helped.",
      author: "Maya KC",
      role: "Student",
    },
    {
      src: "/session4.jpeg",
      quote: "Friendly trainers and realistic plans. Felt supported the whole way.",
      author: "Prakash Rai",
      role: "Teacher",
    },
  ];

  return (
    <section
      className="py-12 px-4 md:py-16 md:px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1000px 320px at 10% 10%, rgba(245,196,0,0.06), transparent), radial-gradient(700px 260px at 90% 80%, rgba(245,196,0,0.03), transparent), linear-gradient(180deg,#080808,#0b0b0b)",
        color: "white",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left md:text-center mb-8">
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ lineHeight: 1.04 }}
          >
            <span style={{ color: "white" }}>This is how we do</span>{" "}
            <span style={{ color: ACCENT }}>it</span>
          </h2>

          <div className="mt-3 w-20 h-1 rounded-full mx-0 md:mx-auto" style={{ background: ACCENT }} />

          <p className="mt-4 text-zinc-300 max-w-2xl md:mx-auto text-base">
            A clear, structured process to make your transformation smooth, guided, and effective.
          </p>
        </div>

        {/* Note-style box (compact) */}
        <div
          className="rounded-xl p-6 md:p-8 mb-12"
          style={{
            background: "rgba(10,10,10,0.6)",
            border: `1px solid rgba(245,196,0,0.10)`,
            boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={step.onClick}
                role={step.onClick ? "button" : undefined}
                tabIndex={step.onClick ? 0 : -1}
                onKeyDown={(e) => {
                  if (step.onClick && (e.key === "Enter" || e.key === " ")) step.onClick();
                }}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 select-none`}
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.03)",
                  cursor: step.onClick ? "pointer" : "default",
                }}
              >
                <div
                  className="flex-shrink-0 rounded-md grid place-items-center"
                  style={{
                    width: 46,
                    height: 46,
                    background: "rgba(245,196,0,0.06)",
                    boxShadow: step.onClick ? "0 8px 24px rgba(245,196,0,0.07)" : "0 4px 12px rgba(0,0,0,0.45)",
                  }}
                >
                  {step.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold" style={{ color: ACCENT }}>
                    Step {i + 1}: {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm truncate">{step.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-zinc-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Photos Section with compact testimonials */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4" style={{ color: ACCENT }}>
            Our Online Sessions in Action
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sessionImages.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group shadow-md"
                style={{
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <img
                  src={item.src}
                  alt={`Session ${index + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-400 group-hover:scale-105"
                  style={{ display: "block" }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.4))",
                  }}
                />

                {/* Testimonial overlay */}
                <div
                  className={
                    "absolute left-0 right-0 bottom-0 px-3 py-2 transition-transform duration-300 " +
                    "translate-y-0 md:translate-y-full md:group-hover:translate-y-0"
                  }
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(6,6,6,0.7))",
                  }}
                >
                  <div
                    className="max-w-full mx-auto rounded-md p-2"
                    style={{
                      background: "linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.35))",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <p className="text-sm text-zinc-200 leading-tight mb-1" style={{ fontStyle: "italic" }}>
                      “{item.quote}”
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: ACCENT }}>
                          {item.author}
                        </div>
                        <div className="text-xs text-zinc-400">{item.role}</div>
                      </div>

                      <div className="hidden md:block text-xs text-zinc-400">Hover image</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThisIsHowWeDoIt;
