import React, { useState } from "react";

export default function Pricing() {
  const [planType, setPlanType] = useState("monthly"); // monthly | yearly

  return (
    <section id="pricing" className="section-offset">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            Choose the Perfect Plan
          </h2>
          <p className="mt-3 text-zinc-300">
            Flexible membership options that match your goals and schedule.
          </p>

          {/* toggle */}
          <div className="mt-8 inline-flex rounded-xl border border-white/10 p-1 bg-zinc-900/60">
            <button
              onClick={() => setPlanType("monthly")}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                planType === "monthly"
                  ? "bg-yellow-400 text-black"
                  : "text-yellow-300 hover:text-yellow-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPlanType("yearly")}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                planType === "yearly"
                  ? "bg-yellow-400 text-black"
                  : "text-yellow-300 hover:text-yellow-200"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Kickstart Program"
            subtitle="3 Months"
            priceNow="AUD $55/week"
            priceOld="AUD $60/week"
            items={[
              "Lose 6–8 Kg with a personalized plan",
              "Build healthy workout & meal habits",
              "Develop consistency and routine",
              "Enhance focus, mood & energy",
            ]}
          />
          <PricingCard
            featured
            title="Lifestyle Reset"
            subtitle="6 Months"
            priceNow="AUD $50/week"
            items={[
              "Everything in Kickstart",
              "Lose 8–14 Kg; visible toning",
              "Strength, flexibility & endurance",
              "Manage stress & cravings; clarity",
              "Foundation for long-term habits",
            ]}
          />
          <PricingCard
            title="Complete Transformation"
            subtitle="12 Months"
            priceNow="AUD $40/week"
            items={[
              "Everything in Lifestyle Reset",
              "Lose 15–20 Kg; full transformation",
              "Improve cardiovascular health",
              "Mobility, flexibility & strength",
              "Lower long-term health risks",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Card component
 * Works with the new Contact.jsx — when user clicks Book Program,
 * passes name, duration, and price to contact page.
 */
function PricingCard({ title, subtitle, priceNow, priceOld, items, featured }) {
  // handle Book Program click
  const handleBook = () => {
    const programData = {
      name: title,
      duration: subtitle,
      price: priceNow,
    };

    // 1) update URL without reload
    const hash = `#contact?${new URLSearchParams(programData).toString()}`;
    try {
      history.pushState(null, "", hash);
    } catch (e) {
      // fallback
      window.location.hash = hash;
    }

    // 2) smooth scroll to contact with navbar offset
    // adjust this if your navbar height differs
    const NAVBAR_OFFSET = 70;
    const el = document.getElementById("contact");
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const target = Math.max(absoluteTop - NAVBAR_OFFSET - 12, 0);

      // small timeout so layout has time to settle on some devices
      setTimeout(() => {
        window.scrollTo({ top: target, behavior: "smooth" });

        // 3) focus first input so user can start typing
        setTimeout(() => {
          const input = el.querySelector("input[name='name'], input, textarea, select");
          if (input) input.focus();
        }, 600);
      }, 50);
    } else {
      // if contact section not found, still change hash so Contact can read it when mounted
      // (no further action needed)
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-full rounded-2xl p-6 sm:p-8 border transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(245,196,0,0.3)]
        ${
          featured
            ? "border-yellow-400/60 bg-zinc-900/70 scale-[1.02]"
            : "border-white/10 bg-zinc-900/40"
        }`}
    >
      {/* Top */}
      <div>
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-base font-semibold text-yellow-400">{subtitle}</p>
          </div>
          {featured && (
            <span className="text-xs px-2 py-1 rounded-md bg-yellow-400 text-black font-bold">
              POPULAR
            </span>
          )}
        </div>

        <div className="mt-4">
          {priceOld && (
            <p className="line-through text-sm text-zinc-500">{priceOld}</p>
          )}
          <p className="text-2xl font-extrabold text-yellow-400">{priceNow}</p>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-zinc-300 min-h-[140px]">
          {items.map((t, i) => (
            <li key={i}>✔ {t}</li>
          ))}
        </ul>
      </div>

      {/* Bottom */}
      <div className="mt-8">
        <button
          onClick={handleBook}
          className="w-full py-3 rounded-lg font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-all"
        >
          Book Program
        </button>
      </div>
    </div>
  );
}
