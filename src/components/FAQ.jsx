import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What’s included in the online personal training program?",
      a: "You’ll receive guided workout plans, nutrition strategies, weekly check-ins, and personalized feedback — all tailored to your goals.",
    },
    {
      q: "Do I need equipment to start?",
      a: "No. We offer equipment-free home workouts, but if you do have gear, your plan will be optimized accordingly.",
    },
    {
      q: "Can I switch my program midway?",
      a: "Yes, you can switch or upgrade your program anytime to match your progress or changing goals.",
    },
    {
      q: "Are meal plans included?",
      a: "Each program comes with a customized meal strategy based on your lifestyle, dietary preferences, and health goals.",
    },
    {
      q: "How do I track my progress?",
      a: "You’ll receive weekly progress check-ins, monthly reports, and ongoing support for adjustments and motivation.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black text-white"
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Frequently Asked <span className="text-yellow-400">Questions</span>
        </h2>
        <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
          Everything you need to know before starting your fitness journey.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-md"
          >
            <button
              className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-white hover:text-yellow-400 transition-all duration-300"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
