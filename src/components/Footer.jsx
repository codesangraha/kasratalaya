// /src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container-x py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="logo" className="w-9 h-9 rounded-full" />
          <span className="font-semibold">KASRATONLINE</span>
        </div>
        <p className="text-sm text-zinc-400">© {new Date().getFullYear()} KasratOnline. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#about" className="hover:text-yellow-400">About</a>
          <a href="#pricing" className="hover:text-yellow-400">Pricing</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}
