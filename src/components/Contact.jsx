// src/components/Contact.jsx
import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';

const ACCENT = "#f5c400";
const NAVBAR_HEIGHT = 70;

// Replace these with your actual EmailJS credentials
const EMAILJS_AUTO_RESPONSE_TEMPLATE_ID = 'template_bniudne';

const EMAILJS_SERVICE_ID = 'service_18o4ljt';
const EMAILJS_TEMPLATE_ID = 'template_hozki29'; 
const EMAILJS_PUBLIC_KEY = 'ByVSNCNHZUYkiBIKB';

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: "",
  });

  const [programMeta, setProgramMeta] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

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
    const parsed = parseQueryFromLocation();
    if (parsed && parsed.program) {
      setProgramMeta({
        name: parsed.program,
        duration: parsed.duration,
        price: parsed.price,
      });
      
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const target = Math.max(absoluteTop - NAVBAR_HEIGHT - 12, 0);
        window.scrollTo({
          top: target,
          behavior: "smooth"
        });
        
        setTimeout(() => {
          const input = el.querySelector("input[name='name'], input, textarea, select");
          if (input) input.focus();
        }, 650);
      }, 80);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: value
    }));
  };

  const sendEmail = async (templateParams, templateId) => {
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        templateId,
        templateParams
      );
      return { success: true, result };
    } catch (error) {
      console.error('EmailJS error:', error);
      return { success: false, error };
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim()) return alert("Please enter your name.");
    if (!form.email.trim()) return alert("Please enter your email.");

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const isProgramBooking = !!programMeta.name;

      // 1. Send notification email to yourself (business)
      const businessTemplateParams = {
        to_email: "aryan.csangraha@gmail.com", // <-- ADDED: ensure recipient exists
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone || 'Not provided',
        preferred_time: form.preferredTime || 'Any time',
        customer_message: form.message || 'No additional message',
        program_name: programMeta.name || 'General Inquiry',
        program_duration: programMeta.duration || 'N/A',
        program_price: programMeta.price || 'N/A',
        booking_type: isProgramBooking ? 'Program Booking' : 'General Inquiry',
        submitted_at: new Date().toLocaleString(),
      };

      console.log('Sending business email with params:', businessTemplateParams);
      const businessResult = await sendEmail(businessTemplateParams, EMAILJS_TEMPLATE_ID);

      if (businessResult.success) {
        console.log('Business email sent successfully');
        
        // 2. Send auto-response to user — ONLY when a program is selected
        if (isProgramBooking) {
          const userTemplateParams = {
            first_name: form.name.split(' ')[0], // Extract first name
            user_name: form.name,
            user_email: form.email,
            program_name: programMeta.name || 'General Inquiry',
            program_duration: programMeta.duration || '',
            program_price: programMeta.price || '',
            booking_type: isProgramBooking ? 'Program Booking' : 'General Inquiry',
            user_message: form.message || 'No additional message',
            payid_number: '0410394893',
            account_name: 'Ritik Ghimire',
            contact_phone: '0410394893',
            contact_email: 'info@kasratonline.com',
            reply_to: form.email,
          };

          console.log('Sending auto-response with params:', userTemplateParams);
          const userResult = await sendEmail(userTemplateParams, EMAILJS_AUTO_RESPONSE_TEMPLATE_ID);

          if (userResult.success) {
            console.log('Auto-response sent successfully');
            setSubmitStatus('success');
            
            // Reset form
            setForm({
              name: "",
              email: "",
              phone: "",
              preferredTime: "",
              message: "",
            });
            
            if (programMeta.name) {
              setProgramMeta({ name: "", duration: "", price: "" });
              // Clear URL parameters
              try {
                history.replaceState(null, "", window.location.pathname);
              } catch (e) {
                window.location.hash = "";
              }
            }
          } else {
            console.error('Auto-response failed:', userResult.error);
            setSubmitStatus('error');
          }
        } else {
          // No program selected — still success for business notification
          setSubmitStatus('success');

          // Reset form
          setForm({
            name: "",
            email: "",
            phone: "",
            preferredTime: "",
            message: "",
          });
          
          if (programMeta.name) {
            setProgramMeta({ name: "", duration: "", price: "" });
            try {
              history.replaceState(null, "", window.location.pathname);
            } catch (e) {
              window.location.hash = "";
            }
          }
        }
      } else {
        console.error('Business email failed:', businessResult.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message
  if (submitStatus === 'success') {
    return (
      <section id="contact" className="section-offset">
        <div className="container-x px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl p-8 border" style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", 
              borderColor: "rgba(245,196,0,0.16)" 
            }}>
              <div className="text-4xl mb-4" style={{ color: ACCENT }}>✓</div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: ACCENT }}>
                {programMeta.name ? "Program Booked Successfully!" : "Thank You!"}
              </h2>
              <p className="text-zinc-300 text-lg mb-6">
                {programMeta.name ? (
                  <>
                    Thanks <strong>{form.name.trim()}</strong>! We've received your booking for <strong>"{programMeta.name}"</strong>. 
                    Check your email for program details and payment information. We'll contact you within 24 hours!
                  </>
                ) : (
                  <>
                    Thanks <strong>{form.name.trim()}</strong>! We received your inquiry and will contact you soon. 
                    Check your email for our auto-response.
                  </>
                )}
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold hover:bg-yellow-300 transition"
                style={{ background: ACCENT, color: "#000" }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-offset">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: ACCENT }}>
            Contact & Booking
          </h2>
          <p className="mt-3 text-zinc-300">
            Quick form — we only ask the essentials. If you clicked <strong>Book Program</strong>, 
            the program info is already filled below.
          </p>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30">
            <div className="text-red-300 font-semibold">Submission Failed</div>
            <div className="text-red-400 text-sm mt-1">
              Please try again or contact us directly at info@kasratonline.com
            </div>
          </div>
        )}

        {/* Grid layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left sidebar - Contact Info */}
          <aside className="col-span-1 order-1 md:order-1">
            <div className="rounded-2xl p-6 sm:p-8 border flex flex-col justify-between h-full" style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              borderColor: "rgba(255,255,255,0.03)"
            }}>
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
                    <a 
                      href="mailto:info@kasratonline.com" 
                      className="font-semibold text-zinc-200 hover:text-white"
                    >
                      info@kasratonline.com
                    </a>
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs">Phone</div>
                    <a 
                      href="tel:+61410394893" 
                      className="font-semibold text-zinc-200 hover:text-white"
                    >
                      +61 410 394 893
                    </a>
                  </div>
                </div>
              </div>

              {/* Social icons + Start a Chat CTA */}
              <div className="mt-6 pt-3 border-t border-white/5">
                <div className="flex items-center gap-3 mt-2">
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/share/1Az83njFYS/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <circle cx="12" cy="12" r="11" fill="transparent" stroke={ACCENT} strokeWidth="1" />
                      <path 
                        d="M13.2 8.5h1.8v-2.1h-1.8c-1.7 0-2.6 1-2.6 2.6v1.1H9.8v2.1h1.6V19h2.1v-7.4h1.6l.3-2.1h-1.9V9.4c0-.6.1-1 .6-1.8z" 
                        fill={ACCENT} 
                      />
                    </svg>
                  </a>
                  
                  {/* Instagram */}
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
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/61410394893" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path 
                        d="M20.5 3.5a10 10 0 1 0-2.2 19.8L22 22l-1.7-3.7A10 10 0 0 0 20.5 3.5z" 
                        fill="transparent" 
                        stroke={ACCENT} 
                        strokeWidth="1"
                      />
                      <path 
                        d="M15.2 14.6c-.2 0-1.1-.3-1.5-.4-.4-.1-.6.1-.8.3-.2.2-.7.5-1.2.6-.3.1-.5.1-.7-.1-.2-.2-.6-.6-1-1-.3-.4-.7-1-.8-1.4-.1-.4 0-.5.2-.6.2-.1.4-.2.6-.4.2-.2.2-.4.1-.6-.1-.2-.6-1.1-.8-1.4-.2-.3-.4-.3-.7-.3-.3 0-.6 0-.9 0-.3 0-.7.1-.9.6-.2.5-.7 1.2-.7 2 0 .8.7 1.7.9 1.9.2.2 2 2.8 5.1 3.8 1.6.5 1.9.5 2.6.4.7-.1 1.6-.7 1.8-1.2.2-.6.2-1.1.2-1.2 0-.1-.1-.2-.3-.3-.2-.1-1.1-.4-1.3-.5z" 
                        fill={ACCENT}
                      />
                    </svg>
                  </a>
                  
                  {/* TikTok */}
                  <a 
                    href="https://www.tiktok.com/@kasratonline?_r=1&_t=ZS-918uhB5elmy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-2 rounded-md hover:bg-white/5 transition grid place-items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path 
                        d="M16 8.5a4 4 0 0 0 4 4v2a6 6 0 1 1-6-6V8.5h2z" 
                        fill={ACCENT}
                      />
                    </svg>
                  </a>
                </div>
                
                <div className="mt-6 pt-3 border-t border-white/5">
                  <div className="text-sm text-zinc-300">
                    Prefer a quick call? Use the form and mention "call" in notes — we'll schedule a convenient time.
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
                        window.scrollTo({
                          top: target,
                          behavior: "smooth"
                        });
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

          {/* Right side - Form */}
          <div className="col-span-1 md:col-span-2 order-2 md:order-2">
            
            {/* Program summary */}
            {programMeta.name && (
              <div className="rounded-2xl p-4 sm:p-6 border mb-4" style={{ 
                background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                borderColor: "rgba(245,196,0,0.08)"
              }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-sm text-zinc-300">Program selected</div>
                    <div className="text-lg font-bold" style={{ color: ACCENT }}>{programMeta.name}</div>
                    <div className="text-xs text-zinc-400 mt-1">
                      You'll receive program details and payment information after booking
                    </div>
                  </div>
                  <div className="text-sm text-zinc-300 flex gap-4">
                    {programMeta.duration && <div>⏱ {programMeta.duration}</div>}
                    {programMeta.price && <div>💳 {programMeta.price}</div>}
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setProgramMeta({ name: "", duration: "", price: "" });
                        try {
                          history.replaceState(null, "", window.location.pathname);
                        } catch (e) {
                          window.location.hash = "";
                        }
                      }}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        border: "1px solid rgba(255,255,255,0.04)",
                        color: ACCENT
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.03)"
            }}>
              <form onSubmit={handleFormSubmit} className="grid gap-4">
                
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                {/* Preferred time */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Preferred time</label>
                  <select
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white"
                    disabled={isSubmitting}
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
                    placeholder={programMeta.name ? 
                      "Any specific goals, injuries, or preferences for your program..." : 
                      "Any questions or information you'd like to share..."
                    }
                    className="w-full rounded-lg p-3 bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ 
                      background: ACCENT, 
                      color: "#000" 
                    }}
                  >
                    {isSubmitting ? "Sending..." : 
                      (programMeta.name ? "Book Program Now" : "Send Message")
                    }
                  </button>
                  <div className="mt-2 text-xs text-zinc-500 text-center">
                    {programMeta.name ? 
                      "You'll receive program details and payment information immediately after booking." :
                      "We'll contact you within 24 hours. By submitting you agree we may reach out about your request."
                    }
                  </div>
                </div>
              </form>
            </div>

            <div className="text-center text-xs text-zinc-500 mt-3">
              Secure & private — your data is safe with us.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
