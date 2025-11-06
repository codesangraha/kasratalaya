// // /src/components/AboutUs.jsx
// import React from "react";

// export default function AboutUs() {
//   return (
//     <section id="about" className="section-offset">
//       <div className="container-x px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
//         <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 items-center">
//           {/* IMAGE (on mobile shown first, on desktop shown right) */}
//           <div className="w-full order-1 md:order-2">
//             <div className="rounded-2xl overflow-hidden shadow-xl">
//               {/* Use an actual photo at /public/about.jpeg. This <img> is responsive and lazy-loads */}
//               <img
//                 src="/about.jpeg"
//                 alt="Kasratalaya training session"
//                 loading="lazy"
//                 className="w-full h-auto object-cover block"
//                 style={{
//                   // keep a pleasant tall-but-not-too-tall ratio on larger screens
//                   maxHeight: "520px",
//                 }}
//               />
//             </div>
//           </div>

//           {/* TEXT */}
//           <div className="order-2 md:order-1">
//             <div className="sm:pr-6 lg:pr-12">
//               <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
//                 “Welcome to <span className="text-yellow-400">Kasratalaya</span>”
//               </h2>

//               <p className="text-lg text-zinc-300 leading-relaxed mb-6">
//                 At Kasratalaya, we believe health is about feeling strong on the inside,
//                 not just the outside. We make wellness accessible and affordable—so your
//                 healthy routine becomes a lifestyle, not a phase. Join us for guided training,
//                 smart nutrition habits, and a supportive community.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
//                 <a
//                   href="#contact"
//                   className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-yellow-400 text-black shadow-sm hover:bg-yellow-300 transition"
//                 >
//                   Let’s Connect
//                 </a>

//                 <a
//                   href="#pricing"
//                   className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-white/10 text-white bg-transparent hover:bg-zinc-800 transition"
//                 >
//                   See Pricing
//                 </a>
//               </div>

//               {/* Optional short highlights — small chips to show key points */}
//               <div className="mt-8 flex flex-wrap gap-3">
//                 <span className="inline-flex items-center gap-2 text-sm bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-2">
//                   <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Guided Programs
//                 </span>
//                 <span className="inline-flex items-center gap-2 text-sm bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-2">
//                   <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Smart Nutrition
//                 </span>
//                 <span className="inline-flex items-center gap-2 text-sm bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-2">
//                   <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Accountability
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
