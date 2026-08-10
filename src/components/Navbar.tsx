import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const WA_URL =
  "https://wa.me/51999123456?text=Hola%2C%20me%20gustar%C3%ADa%20conversar%20con%20Media%20%26%20Crisis.";

const navItems = [
  { label: "SERVICIOS", path: "/servicios" },
  { label: "CREDENCIALES", path: "/credenciales" },
  { label: "BLOG", path: "/blog" },
  { label: "NOSOTROS", path: "/nosotros" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/98 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="text-left group">
          <div className="text-white font-bold text-base tracking-[0.2em] uppercase leading-none mb-0.5 group-hover:text-red-500 transition-colors">
            MEDIA & CRISIS
          </div>
          <div className="text-gray-600 text-[9px] tracking-wider">
            Antes parte de Efecto Estrategia Comunicaciones
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[11px] tracking-[0.18em] font-medium transition-all pb-0.5 border-b ${
                location.pathname === item.path
                  ? "text-white border-red-600"
                  : "text-gray-400 border-transparent hover:text-white hover:border-white/30"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white text-[11px] tracking-[0.18em] font-medium px-6 py-2 transition-all hover:bg-white hover:text-black flex items-center gap-2"
          >
            CONTACTO
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
          aria-label="Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm tracking-[0.18em] text-white text-left py-1 hover:text-red-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white text-[11px] tracking-[0.18em] px-6 py-3 mt-2 hover:bg-red-600 hover:border-red-600 transition-all text-center"
            >
              CONTACTO
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
