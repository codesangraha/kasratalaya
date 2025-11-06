// src/components/Contact.jsx
import React, { useEffect, useState } from "react";

/**
 * Contact component (updated icons)
 * - Same layout and behavior as before
 * - Replaced social icons with cleaner, modern SVGs that match the accent color
 * - Social links open in new tab, are keyboard accessible
 */

const ACCENT = "#f5c400";
const NAVBAR_HEIGHT = 70; // adjust if your navbar height differs

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: "",
  });

  // Program metadata (prefilled from URL)
  const [programMeta, setProgramMeta] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [success, setSuccess] = useState(null);

  // parse program data from URL (hash or search)
  const parseQueryFromLocation = () => {
    try {
      const rawHash = window.location.hash || "";
      let queryString = "";
      if (rawHash.includes("?")) {
        queryString = rawHash.split("?")[1];
      } else if (window.location.search) {
        queryString = window.location.search.replace(/^\?/, "");
      }
      if (!queryString) return null;
      const params = new URLSearchParams(queryString);
      const prog = params.get("program") || params.get("name");
      const duration = params.get("duration") || "";
      const price = params.get("price") || "";
      return {
        program: prog ? decodeURIComponent(prog) : "",
        duration: duration ? decodeURIComponent(duration) : "",
        price: price ? decodeURIComponent(price) : "",
      };
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    // Parse once on mount
    const parsed = parseQueryFromLocation();
    if (parsed && parsed.program) {
      setProgramMeta({
        name: parsed.program,
        duration: parsed.duration,
        price: parsed.price,
      });

      // scroll into view with offset after a short delay so layout stabilizes (important on mobile)
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const target = Math.max(absoluteTop - NAVBAR_HEIGHT - 12, 0);
        window.scrollTo({ top: target, behavior: "smooth" });

        // focus first input after scroll
        setTimeout(() => {
          const input = el.querySelector("input[name='name'], input, textarea, select");
          if (input) input.focus();
        }, 650);
      }, 80);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter your name.");
    if (!form.email.trim()) return alert("Please enter your email.");

    // Build payload (demo). Replace with API/email logic later.
    const payload = {
      program: programMeta.name || "General enquiry",
      duration: programMeta.duration || "",
      price: programMeta.price || "",
      ...form,
      submittedAt: new Date().toISOString(),
    };

    // Show success message (small inline toast) — keeps UX smooth on mobile
    setSuccess({
      title: "Request received",
      text: `Thanks ${form.name.trim() || ""}! We received your request for "${payload.program}". We'll contact you soon.`,
      payload,
    });

    // clear lighter fields but keep program meta
    setForm({ name: "", email: "", phone: "", preferredTime: "", message: "" });

    // auto-hide success
    setTimeout(() => setSuccess(null), 4500);
  };

  return (
    <section id="contact" className="section-offset">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: ACCENT }}>
            Contact & Booking
          </h2>
          <p className="mt-3 text-zinc-300">
            Quick form — we only ask the essentials. If you clicked <strong>Book Program</strong>, the program info is already filled below.
          </p>
        </div>

        {/* Success toast */}
        {success && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-lg" style={{ background: "linear-gradient(180deg, rgba(245,196,0,0.09), rgba(245,196,0,0.04))", border: "1px solid rgba(245,196,0,0.16)" }}>
            <div className="text-sm md:text-base font-semibold" style={{ color: "#000" }}>{success.title}</div>
            <div className="text-sm text-zinc-800 mt-1">{success.text}</div>
          </div>
        )}

        {/* Grid: Contact Info (left) + Form (right) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info panel (left on md+, stacks on mobile) */}
          <aside className="col-span-1 order-1 md:order-1">
            <div className="rounded-2xl p-6 sm:p-8 border flex flex-col justify-between h-full" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderColor: "rgba(255,255,255,0.03)" }}>
              <div>
                <h3 className="text-lg font-bold" style={{ color: ACCENT }}>Contact Info</h3>
                <p className="mt-2 text-zinc-300 text-sm">
                  For quick questions or program support reach out directly.
                </p>

                <div className="mt-4 text-sm space-y-3">
                  <div>
                    <div className="text-zinc-400 text-xs">Based on</div>
                    <div className="font-semibold">Sydney, AUS</div>
                  </div>

                  <div>
                    <div className="text-zinc-400 text-xs">Email</div>
                    <a href="mailto:info@kasratonline.com" className="font-semibold text-zinc-200 hover:text-white">info@kasratonline.com</a>
                  </div>

                  <div>
                    <div className="text-zinc-400 text-xs">Phone</div>
                    <a href="tel:+61410394893" className="font-semibold text-zinc-200 hover:text-white">+61 410 394 893</a>
                  </div>

                  {/* <div>
                    <div className="text-zinc-400 text-xs">Hours</div>
                    <div className="font-medium text-zinc-200">Mon — Sat: 6 AM — 9 PM</div>
                  </div> */}
                </div>
              </div>

              {/* Social icons + Start a Chat CTA */}
              <div className="mt-6 pt-3 border-t border-white/5">
                <div className="flex items-center gap-3 mt-2">
                  {/* Facebook (clean 'f' in circle) */}
                  <a
                    href="https://www.facebook.com/share/1Az83njFYS/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <circle cx="12" cy="12" r="11" fill="transparent" stroke={ACCENT} strokeWidth="1" />
                      <path d="M13.2 8.5h1.8v-2.1h-1.8c-1.7 0-2.6 1-2.6 2.6v1.1H9.8v2.1h1.6V19h2.1v-7.4h1.6l.3-2.1h-1.9V9.4c0-.6.1-1 .6-1.8z" fill={ACCENT} />
                    </svg>
                  </a>

                  {/* Instagram (rounded camera outline) */}
                  <a
                    href="https://www.instagram.com/kasratonline?igsh=MWY0emJ2OTMwNjIwaA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke={ACCENT} strokeWidth="1.3" fill="transparent"/>
                      <circle cx="12" cy="11.8" r="3.1" stroke={ACCENT} strokeWidth="1.2" fill="transparent"/>
                      <circle cx="17.2" cy="6.8" r="0.5" fill={ACCENT}/>
                    </svg>
                  </a>

                  {/* WhatsApp (chat bubble + phone symbol) */}
                  <a
                    href="https://wa.me/61410394893"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path d="M20.5 3.5a10 10 0 1 0-2.2 19.8L22 22l-1.7-3.7A10 10 0 0 0 20.5 3.5z" fill="transparent" stroke={ACCENT} strokeWidth="1"/>
                      <path d="M15.2 14.6c-.2 0-1.1-.3-1.5-.4-.4-.1-.6.1-.8.3-.2.2-.7.5-1.2.6-.3.1-.5.1-.7-.1-.2-.2-.6-.6-1-1-.3-.4-.7-1-.8-1.4-.1-.4 0-.5.2-.6.2-.1.4-.2.6-.4.2-.2.2-.4.1-.6-.1-.2-.6-1.1-.8-1.4-.2-.3-.4-.3-.7-.3-.3 0-.6 0-.9 0-.3 0-.7.1-.9.6-.2.5-.7 1.2-.7 2 0 .8.7 1.7.9 1.9.2.2 2 2.8 5.1 3.8 1.6.5 1.9.5 2.6.4.7-.1 1.6-.7 1.8-1.2.2-.6.2-1.1.2-1.2 0-.1-.1-.2-.3-.3-.2-.1-1.1-.4-1.3-.5z" fill={ACCENT}/>
                    </svg>
                  </a>

                  {/* TikTok (note shape) */}
                  <a
                    href="https://www.tiktok.com/@kasratonline?_r=1&_t=ZS-918uhB5elmy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path d="M16 8.5a4 4 0 0 0 4 4v2a6 6 0 1 1-6-6V8.5h2z" fill={ACCENT}/>
                    </svg>
                  </a>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5">
                  <div className="text-sm text-zinc-300">
                    Prefer a quick call? Use the form and mention “call” in notes — we’ll schedule a convenient time.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      // scroll to form quickly on click
                      const el = document.querySelector("#contact form");
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const absoluteTop = rect.top + window.scrollY;
                        const target = Math.max(absoluteTop - NAVBAR_HEIGHT - 12, 0);
                        window.scrollTo({ top: target, behavior: "smooth" });
                        setTimeout(() => {
                          const nameInput = el.querySelector("input[name='name']");
                          if (nameInput) nameInput.focus();
                        }, 600);
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
                  >
                    Start a Chat
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Form area (right on md+) */}
          <div className="col-span-1 md:col-span-2 order-2 md:order-2">
            {/* Program summary (if any) */}
            {programMeta.name ? (
              <div className="rounded-2xl p-4 sm:p-6 border mb-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderColor: "rgba(245,196,0,0.08)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-sm text-zinc-300">Program selected</div>
                    <div className="text-lg font-bold" style={{ color: ACCENT }}>{programMeta.name}</div>
                  </div>

                  <div className="text-sm text-zinc-300 flex gap-4">
                    {programMeta.duration && <div>⏱ {programMeta.duration}</div>}
                    {programMeta.price && <div>💳 {programMeta.price}</div>}
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        // allow user to clear the prefilled program quickly
                        setProgramMeta({ name: "", duration: "", price: "" });
                        // remove program from URL so back/forward behavior stays clean
                        try {
                          history.replaceState(null, "", window.location.pathname + window.location.search);
                        } catch (e) {
                          // fallback: set hash to empty
                          window.location.hash = "";
                        }
                      }}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ border: "1px solid rgba(255,255,255,0.04)", color: ACCENT }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Form card */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.03)" }}>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+XX XXXXXXXX"
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white"
                  />
                </div>

                {/* Preferred time (compact) */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Preferred time</label>
                  <select
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (5 AM – 6 AM)</option>
                    <option value="midday">Midday (11 AM – 2 PM)</option>
                    <option value="evening">Evening (6 PM – 9 PM)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Notes / Goals (optional)</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any goals, injuries, or things we should know (optional)"
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-lg py-3 font-bold"
                    style={{ background: ACCENT, color: "#000" }}
                  >
                    Send Request
                  </button>

                  <div className="mt-2 text-xs text-zinc-500 text-center">
                    We’ll contact you within 24 hours. By submitting you agree we may reach out about your request.
                  </div>
                </div>
              </form>
            </div>

            {/* Small helpful footer for mobile spacing */}
            <div className="text-center text-xs text-zinc-500 mt-3">
              Secure & private — your data is safe with us.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
