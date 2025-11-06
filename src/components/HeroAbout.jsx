// src/components/HeroAbout.jsx
import React from "react";

/**
 * HeroAbout — concise, single-section hero + about (minimal necessary content)
 * - Mobile-first and responsive
 * - Dark theme with yellow accent (matches site)
 * - Smooth scroll to sections with NAVBAR_OFFSET for fixed nav
 *
 * Place /logo.jpg in public/ for the visual; you can replace with SVG if preferred.
 */

const ACCENT = "#F5C400";
const NAVBAR_OFFSET = 70; // adjust to match your navbar height

export default function HeroAbout() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - NAVBAR_OFFSET - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  return (
    <section className="section-offset bg-black text-white">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-12 items-center">
          {/* LEFT: concise headline + value */}
          <div className="md:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
              style={{ background: "rgba(245,196,0,0.06)", color: ACCENT }}
            >
              Health • Fitness • Consistency
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Hajur ko Swasthya <span style={{ color: ACCENT }}>Hamro Jimmewari</span>
            </h1>

            <p className="mt-4 text-lg text-zinc-300 max-w-xl">
              Simple, guided programs and realistic nutrition — designed to fit your life so healthy routines stick.
            </p>

            {/* 3 core benefits — short and scannable */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-yellow-400">•</span>
                <span className="text-zinc-300">Personalized plans</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-yellow-400">•</span>
                <span className="text-zinc-300">Weekly check-ins</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-yellow-400">•</span>
                <span className="text-zinc-300">Sustainable nutrition</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("pricing")}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition"
                aria-label="View Plans"
              >
                View Plans
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/10 text-white bg-transparent hover:bg-zinc-900 transition"
                aria-label="Contact"
              >
                Book / Contact
              </button>
            </div>
          </div>

          {/* RIGHT: compact visual + tiny stats (keeps visual weight but small) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="w-full max-w-xs">
              <div className="rounded-2xl overflow-hidden p-4 border border-zinc-800 bg-zinc-900/30">
                <div className="flex justify-center">
                  <img
                    src="/logo.jpg"
                    alt="KasratOnline"
                    className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full drop-shadow-[0_12px_40px_rgba(245,196,0,0.12)]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 text-center">
                  <div className="text-sm text-zinc-300">KasratOnline Guided</div>
                  <div className="mt-1 text-lg font-bold" style={{ color: ACCENT }}>
                    Real results. Small commitment.
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-zinc-400">
                  <div>
                    <div className="font-semibold text-white">3</div>
                    <div>Programs</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">8–15 kg</div>
                    <div>Avg. loss</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">98%</div>
                    <div>Satisfaction</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => scrollTo("pricing")}
                    className="w-full rounded-lg py-2 font-bold text-black"
                    style={{ background: ACCENT }}
                  >
                    See Plans
                  </button>
                </div>
              </div>

              <div className="mt-3 text-xs text-zinc-500 text-center">
                No long forms — quick start.
              </div>
            </div>
          </div>
        </div>

        {/* Short About paragraph below (single, necessary paragraph) */}
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="text-zinc-300">
            We focus on programs that are easy to follow, sustainable, and backed by weekly coaching — so your health becomes a habit, not a project.
          </p>
        </div>
      </div>
    </section>
  );
}
