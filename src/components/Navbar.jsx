// /src/components/Navbar.jsx
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onClick }) => (
    <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 font-semibold">
      {/* <li><a onClick={onClick} href="#home" className="hover:text-yellow-400">Home</a></li> */}
      {/* <li><a onClick={onClick} href="#about" className="hover:text-yellow-400">About Us</a></li> */}
      <li><a onClick={onClick} href="#pricing" className="hover:text-yellow-400">Program & Pricing</a></li>
      <li><a onClick={onClick} href="#contact" className="hover:text-yellow-400">Contact</a></li>
    </ul>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container-x h-[84px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-lg font-bold tracking-wide">KASRATONLINE</span>
        </div>

        <nav className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="btn-primary">Join Our Family</a>
        </div>

        {/* mobile toggler */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="container-x py-6 flex flex-col gap-6">
            <NavLinks onClick={() => setOpen(false)} />
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary">Join Our Family</a>
          </div>
        </div>
      )}
    </header>
  );
}
