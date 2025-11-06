// /src/App.jsx
import Navbar from "./components/Navbar";

import ThisIsHowWeDoIt from "./components/ThisIsHowWeDoIt";
import HeroAbout from "./components/HeroAbout";

import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-[70px]">
        
        <ThisIsHowWeDoIt />
        <HeroAbout/>
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
