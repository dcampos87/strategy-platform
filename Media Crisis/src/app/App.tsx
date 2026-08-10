import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Download, ChevronRight,
  Mail, Phone, Linkedin, Shield, Megaphone,
  BookOpen, BarChart2, Eye, Award, Globe, Calendar
} from "lucide-react";

type Page = "home" | "servicios" | "credenciales" | "blog" | "nosotros";

const WA_URL = "https://wa.me/51999123456?text=Hola%2C%20me%20gustar%C3%ADa%20conversar%20con%20Media%20%26%20Crisis.";
const openWhatsApp = () => window.open(WA_URL, "_blank");

// ─── DATA ────────────────────────────────────────────────────────────────────

const capabilities = [
  {
    icon: Megaphone,
    title: "RELACIONES PÚBLICAS",
    items: ["Gestión de Prensa", "Asuntos Públicos", "Relaciones Comunitarias", "Softlanding en Perú"],
    accent: false,
  },
  {
    icon: Calendar,
    title: "MARKETING Y EVENTOS",
    items: ["Marketing y Publicidad", "Gestión de Prensa", "Producción de Eventos", "BTL", "Producción Audiovisual"],
    accent: false,
  },
  {
    icon: Shield,
    title: "MANEJO DE CRISIS Y RIESGOS",
    items: [
      "Auditorías de Riesgo Reputacional para compliance",
      "Prevención de Riesgos y Crisis Reputacional",
      "Gestión Social y Prevención de Conflictos",
      "Protocolos de Crisis",
      "Gestión de Crisis",
    ],
    accent: true,
  },
  {
    icon: BookOpen,
    title: "TALLERES Y ENTRENAMIENTOS",
    items: ["Media Training", "Simulacro de Crisis", "Capacitación de protocolos", "Inducción política y social del país"],
    accent: false,
  },
  {
    icon: BarChart2,
    title: "AUDITORÍAS",
    items: [
      "Auditorías de Riesgo Reputacional para compliance",
      "Auditorías de Percepción con líderes de opinión",
    ],
    accent: false,
  },
];

const insights = [
  {
    category: "INFRAESTRUCTURA",
    title: "Infraestructura en el Perú: oportunidad histórica, riesgos reales",
    date: "Junio 2026",
    excerpt:
      "Las grandes obras de infraestructura abren ventanas de crecimiento únicas, pero concentran riesgos reputacionales que pocas organizaciones saben anticipar.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
  {
    category: "GESTIÓN DE CRISIS",
    title: "Lecciones de crisis en proyectos portuarios",
    date: "Mayo 2026",
    excerpt:
      "Tres casos reales de puertos latinoamericanos revelan patrones comunes de escalada y los puntos de inflexión donde la comunicación marca la diferencia.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&auto=format",
  },
  {
    category: "RIESGO REPUTACIONAL",
    title: "Cómo medir el riesgo reputacional en proyectos de alta exposición",
    date: "Mayo 2026",
    excerpt:
      "Un modelo de auditoría reputacional aplicado al sector minero-energético permite cuantificar la exposición antes de que el conflicto estalle.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&auto=format",
  },
  {
    category: "ASUNTOS PÚBLICOS",
    title: "Relaciones comunitarias estratégicas: del conflicto a la confianza",
    date: "Abril 2026",
    excerpt:
      "Transformar la relación con comunidades afectadas por proyectos extractivos requiere más que consulta previa: exige presencia, narrativa y continuidad.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format",
  },
  {
    category: "MANEJO DE CRISIS",
    title: "Preparación y respuesta: la diferencia entre controlar o amplificar una crisis",
    date: "Abril 2026",
    excerpt:
      "Las organizaciones que practican simulacros antes de necesitarlos responden 60% más rápido cuando el escenario real ocurre.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format",
  },
];

const casos = [
  {
    title: "Crisis portuaria en el norte del país",
    sector: "INFRAESTRUCTURA PORTUARIA",
    result: "Resolución en 72 horas",
    description:
      "Gestión de crisis reputacional ante paralización de operaciones por conflicto comunitario en terminal portuario de alta criticidad nacional.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
  },
  {
    title: "Licencia social en corredor minero",
    sector: "MINERÍA",
    result: "Recuperación de licencia social",
    description:
      "Diseño e implementación de estrategia de relaciones comunitarias para empresa minera con historial de conflictos en zona andina.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
  },
  {
    title: "Reputación bajo fuego regulatorio",
    sector: "TELECOMUNICACIONES",
    result: "Protección de valor de marca",
    description:
      "Estrategia de comunicación pública durante proceso de sanción regulatoria con cobertura mediática de alta intensidad nacional.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop&auto=format",
  },
  {
    title: "Softlanding de corporación extranjera",
    sector: "ENERGÍA",
    result: "Entrada exitosa al mercado peruano",
    description:
      "Proceso de posicionamiento reputacional e inserción en el ecosistema público-privado para empresa energética latinoamericana.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop&auto=format",
  },
  {
    title: "Gestión de prensa en accidente industrial",
    sector: "CONSTRUCCIÓN",
    result: "Control de narrativa mediática",
    description:
      "Respuesta de comunicación de crisis ante accidente en obra de infraestructura vial con alto impacto en la agenda periodística.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop&auto=format",
  },
  {
    title: "Campaña de relacionamiento público-institucional",
    sector: "SANEAMIENTO",
    result: "Aprobación del 78% en stakeholders",
    description:
      "Diseño de estrategia de asuntos públicos para empresa de saneamiento ante expansión de concesión en tres regiones del país.",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop&auto=format",
  },
];

const team = [
  {
    name: "Patricia Ríos",
    role: "CEO & Fundadora",
    bio: "Más de 20 años en comunicaciones corporativas y gestión de crisis para organizaciones de infraestructura en Latinoamérica.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Diego Montoya",
    role: "Director de Crisis",
    bio: "Ex asesor de comunicaciones del Ministerio de Energía y Minas. Especialista en conflictos socioambientales y licencia social.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Valeria Castillo",
    role: "Directora de Relaciones Públicas",
    bio: "Especialista en medios nacionales y gestión de agenda editorial. Exjefa de prensa de operadora de infraestructura regional.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Andrés Peñaloza",
    role: "Director de Asuntos Públicos",
    bio: "Consultor político y experto en relaciones comunitarias. Ha trabajado en más de 30 proyectos de inversión en el Perú.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&auto=format",
  },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function SectionLabel({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[10px] font-semibold tracking-[0.3em] uppercase text-red-600 mb-3`}>
      {children}
    </p>
  );
}

function Navbar({
  activePage,
  setActivePage,
}: {
  activePage: Page;
  setActivePage: (p: Page) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: "SERVICIOS", page: "servicios" },
    { label: "CREDENCIALES", page: "credenciales" },
    { label: "BLOG", page: "blog" },
    { label: "NOSOTROS", page: "nosotros" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/98 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <button
          onClick={() => { setActivePage("home"); setMobileOpen(false); }}
          className="text-left group"
        >
          <div className="text-white font-bold text-base tracking-[0.2em] uppercase leading-none mb-0.5 group-hover:text-red-500 transition-colors">
            MEDIA & CRISIS
          </div>
          <div className="text-gray-600 text-[9px] tracking-wider">
            Antes parte de Efecto Estrategia Comunicaciones
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`text-[11px] tracking-[0.18em] font-medium transition-all pb-0.5 border-b ${
                activePage === item.page
                  ? "text-white border-red-600"
                  : "text-gray-400 border-transparent hover:text-white hover:border-white/30"
              }`}
            >
              {item.label}
            </button>
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
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-5">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => { setActivePage(item.page); setMobileOpen(false); }}
                className="text-sm tracking-[0.18em] text-white text-left py-1 hover:text-red-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
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

function Footer({ setActivePage }: { setActivePage: (p: Page) => void }) {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    cargo: "",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nombre: "", empresa: "", correo: "", cargo: "", mensaje: "" });
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <button onClick={() => setActivePage("home")} className="text-left mb-5 group">
              <div className="text-white font-bold text-lg tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors">
                MEDIA & CRISIS
              </div>
              <div className="text-gray-600 text-[9px] tracking-wider mt-0.5">
                Antes parte de Efecto Estrategia Comunicaciones
              </div>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Ayudamos a organizaciones de infraestructura principal a gestionar y superar crisis complejas en entornos de alta exposición.
            </p>
            <div className="flex gap-3 text-[10px] text-gray-600 tracking-[0.2em]">
              <span>Creatividad</span>
              <span className="text-red-600">·</span>
              <span>Estrategia</span>
              <span className="text-red-600">·</span>
              <span>Ejecución</span>
            </div>
          </div>

          {/* Enfoque */}
          <div>
            <SectionLabel>ENFOQUE TRANSVERSAL</SectionLabel>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Trabajamos con organizaciones de todos los sectores de infraestructura: energía, minería, transporte, puertos, construcción, saneamiento, telecomunicaciones y más.
            </p>
            <div className="space-y-2">
              {(["servicios", "credenciales", "blog", "nosotros"] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePage(p)}
                  className="block text-[10px] text-gray-600 tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  {p} →
                </button>
              ))}
            </div>
          </div>

          {/* Contact + mini form */}
          <div>
            <SectionLabel>CONTÁCTANOS</SectionLabel>
            <div className="space-y-3 mb-6">
              {[
                { icon: Mail, value: "hola@mediacrisis.pe" },
                { icon: Phone, value: "+51 999 123 456" },
                { icon: Linkedin, value: "Lima, Perú" },
              ].map(({ icon: Icon, value }, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
                  <Icon size={13} className="text-red-600 flex-shrink-0" />
                  {value}
                </div>
              ))}
            </div>

            {sent ? (
              <div className="border border-green-500/30 bg-green-500/5 p-4 text-center">
                <p className="text-green-400 text-xs tracking-wider">✓ MENSAJE ENVIADO</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Nombre"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                    required
                  />
                  <input
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Empresa"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    placeholder="Correo"
                    type="email"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                    required
                  />
                  <input
                    value={form.cargo}
                    onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                    placeholder="Cargo"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <textarea
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Mensaje"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white text-[10px] tracking-[0.2em] py-3 hover:bg-red-700 transition-colors"
                >
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-700 text-xs">© 2026 Media & Crisis. Todos los derechos reservados.</p>
          <p className="text-gray-700 text-xs">Lima, Perú</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    tag: "INFRAESTRUCTURA",
    headline: ["Protegemos la reputación", "que hace posible el", "futuro del país."],
    accent: 2,
    body: "Acompañamos a organizaciones de infraestructura crítica — puertos, vías, saneamiento — a gestionar crisis reputacionales en entornos de alta exposición social y mediática.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=1000&fit=crop&auto=format",
    alt: "Puente de infraestructura al atardecer",
  },
  {
    tag: "ENERGÍAS RENOVABLES",
    headline: ["La transición energética", "exige más que tecnología:", "exige confianza pública."],
    accent: 2,
    body: "Los proyectos de energía solar, eólica e hídrica enfrentan resistencia comunitaria e institucional. Construimos el respaldo social que hace viable la inversión.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&h=1000&fit=crop&auto=format",
    alt: "Parque de energía renovable al amanecer",
  },
  {
    tag: "TECNOLOGÍA · FINTECH & IA",
    headline: ["En la era de la IA,", "la reputación digital", "se gestiona en tiempo real."],
    accent: 1,
    body: "Las empresas de tecnología financiera e inteligencia artificial operan bajo escrutinio regulatorio y mediático constante. Anticipamos el riesgo antes de que escale.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=1000&fit=crop&auto=format",
    alt: "Infraestructura tecnológica y datos",
  },
  {
    tag: "ASUNTOS PÚBLICOS",
    headline: ["La relación con el Estado", "es un activo estratégico", "que se gestiona, no se improvisa."],
    accent: 2,
    body: "Diseñamos estrategias de relacionamiento con actores públicos, reguladores y comunidades para que sus proyectos avancen sin fricciones innecesarias.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&h=1000&fit=crop&auto=format",
    alt: "Ciudad e instituciones públicas",
  },
];

function HeroSlider({ setActivePage }: { setActivePage: (p: Page) => void }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setPrev(active);
    setActive(idx);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
  };

  const next = () => goTo((active + 1) % SLIDES.length);
  const prev_ = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 6000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [active]);

  const slide = SLIDES[active];

  return (
    <section className="relative min-h-screen flex items-end pb-28 overflow-hidden">
      {/* Background layers */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : i === prev ? 0 : 0, zIndex: i === active ? 1 : i === prev ? 0 : -1 }}
        >
          <img src={s.image} alt={s.alt} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl">
          <p
            key={`tag-${active}`}
            className="text-red-600 text-[10px] font-bold tracking-[0.35em] mb-6 opacity-0 animate-[fadeSlideUp_0.6s_0.1s_ease_forwards]"
          >
            {slide.tag}
          </p>
          <h1
            key={`h-${active}`}
            className="font-display text-3xl lg:text-[2.6rem] font-bold text-white leading-[1.1] mb-8 tracking-tight opacity-0 animate-[fadeSlideUp_0.6s_0.2s_ease_forwards]"
          >
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {i === slide.accent ? <span className="text-red-600 italic">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p
            key={`body-${active}`}
            className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg opacity-0 animate-[fadeSlideUp_0.6s_0.35s_ease_forwards]"
          >
            {slide.body}
          </p>
          <div
            key={`cta-${active}`}
            className="flex flex-wrap gap-4 mb-14 opacity-0 animate-[fadeSlideUp_0.6s_0.45s_ease_forwards]"
          >
            <button
              onClick={() => setActivePage("servicios")}
              className="bg-red-600 text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-red-700 transition-colors"
            >
              VER SERVICIOS
            </button>
            <button
              onClick={openWhatsApp}
              className="border border-white/60 text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all"
            >
              CONTACTO
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Dots */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 ${
                  i === active
                    ? "w-8 h-[3px] bg-red-600"
                    : "w-3 h-[3px] bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-gray-600 text-xs tracking-widest">
            {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={prev_}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
              aria-label="Anterior"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-10">
        <div
          key={active}
          className="h-full bg-red-600 animate-[progress_6s_linear_forwards]"
        />
      </div>
    </section>
  );
}

function HomePage({ setActivePage }: { setActivePage: (p: Page) => void }) {
  return (
    <div className="bg-black">
      {/* HERO SLIDER */}
      <HeroSlider setActivePage={setActivePage} />

      {/* SERVICIOS */}
      <section className="bg-[#0D0D0D] py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>NUESTROS</SectionLabel>
            <h2 className="text-white text-4xl font-bold">Servicios</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-white/10">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className={`p-8 border-b lg:border-b-0 border-r-0 lg:border-r border-white/10 last:border-r-0 transition-all group hover:bg-white/[0.03] ${
                    cap.accent ? "relative" : ""
                  }`}
                >
                  {cap.accent && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
                  )}
                  <Icon
                    size={26}
                    className={`mb-5 transition-colors ${
                      cap.accent ? "text-red-500" : "text-gray-600 group-hover:text-gray-400"
                    }`}
                  />
                  <h3
                    className={`text-xs font-bold tracking-[0.12em] mb-5 leading-tight ${
                      cap.accent ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {cap.title}
                  </h3>
                  <ul className="space-y-2">
                    {cap.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-gray-600 text-xs leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-red-700 mt-0.5 flex-shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setActivePage("servicios")}
              className="text-[10px] text-gray-600 tracking-[0.2em] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              VER TODOS LOS SERVICIOS <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* CREDENCIALES CTA */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=1600&h=700&fit=crop&auto=format"
            alt="Túnel de infraestructura"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>CREDENCIALES</SectionLabel>
          <h2 className="text-white font-display text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Experiencia que construye confianza
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Conozca cómo hemos acompañado a organizaciones en proyectos críticos del país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActivePage("credenciales")}
              className="border border-white text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all"
            >
              VER CREDENCIALES
            </button>
            <button className="flex items-center justify-center gap-3 text-white text-xs tracking-[0.2em] border border-white/30 px-8 py-4 hover:border-white/60 transition-all">
              <Download size={13} className="text-red-500" />
              DESCARGAR COMPANY PROFILE (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>BLOG</SectionLabel>
              <h2 className="text-black text-4xl font-bold">Ideas para anticipar lo que viene</h2>
            </div>
            <button
              onClick={() => setActivePage("blog")}
              className="text-[10px] text-gray-400 tracking-[0.2em] hover:text-red-600 transition-colors flex items-center gap-1.5 pb-1 flex-shrink-0"
            >
              VER TODOS <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {insights.map((item, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="overflow-hidden mb-4 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-red-600 text-[9px] font-bold tracking-[0.25em] mb-2">
                  {item.category}
                </p>
                <h4 className="text-black text-sm font-semibold leading-snug mb-2 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-xs">{item.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICIOS PAGE ───────────────────────────────────────────────────────────

const SERVICIOS_DATA = [
  {
    category: "COMUNICACIÓN",
    title: "Relaciones Públicas",
    description: "Construimos y mantenemos la presencia de su organización en medios, comunidades y entornos institucionales de alta complejidad.",
    items: ["Gestión de Prensa", "Asuntos Públicos", "Relaciones Comunitarias", "Softlanding en Perú"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=600&fit=crop&auto=format",
    icon: Megaphone,
    accent: false,
  },
  {
    category: "COMUNICACIÓN",
    title: "Marketing y Eventos",
    description: "Diseñamos campañas y experiencias que posicionan a su organización como referente en sectores de infraestructura y alta exposición.",
    items: ["Marketing y Publicidad", "Gestión de Prensa", "Producción de Eventos", "BTL", "Producción Audiovisual"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop&auto=format",
    icon: Calendar,
    accent: false,
  },
  {
    category: "CRISIS",
    title: "Manejo de Crisis y Riesgos",
    description: "Nuestra capacidad core. Anticipamos, contenemos y revertimos situaciones de crisis reputacional en los entornos más exigentes del Perú y la región.",
    items: ["Auditorías de Riesgo Reputacional para compliance", "Prevención de Riesgos y Crisis Reputacional", "Gestión Social y Prevención de Conflictos", "Protocolos de Crisis", "Gestión de Crisis"],
    image: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=900&h=600&fit=crop&auto=format",
    icon: Shield,
    accent: true,
  },
  {
    category: "FORMACIÓN",
    title: "Talleres y Entrenamientos",
    description: "Preparamos a equipos directivos y de comunicaciones para responder con eficacia ante escenarios de crisis, presión mediática y conflicto social.",
    items: ["Media Training", "Simulacro de Crisis", "Capacitación de protocolos", "Inducción política y social del país"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=600&fit=crop&auto=format",
    icon: BookOpen,
    accent: false,
  },
  {
    category: "AUDITORÍA",
    title: "Auditorías Reputacionales",
    description: "Medimos el estado real de su reputación corporativa con metodología propia, identificando vulnerabilidades antes de que se conviertan en crisis.",
    items: ["Auditorías de Riesgo Reputacional para compliance", "Auditorías de Percepción con líderes de opinión"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
    icon: BarChart2,
    accent: false,
  },
];

const SERVICIOS_CATS = ["TODOS", "COMUNICACIÓN", "CRISIS", "FORMACIÓN", "AUDITORÍA"];

function ServiciosPage({ setActivePage }: { setActivePage: (p: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("TODOS");

  const filtered = activeCategory === "TODOS"
    ? SERVICIOS_DATA
    : SERVICIOS_DATA.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-black pt-24">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=600&fit=crop&auto=format"
            alt="Líneas de transmisión de energía"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>NUESTROS</SectionLabel>
          <h1 className="text-white font-display text-3xl lg:text-4xl font-bold max-w-2xl leading-tight mb-4">
            Servicios estratégicos de clase mundial
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Cada servicio está diseñado para entornos de alta complejidad donde la reputación está en juego.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="border-b border-white/10 bg-[#0D0D0D] sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex gap-3 flex-wrap">
          {SERVICIOS_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.18em] px-5 py-2.5 font-medium transition-all ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "text-gray-500 hover:text-white border border-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Bloques con imagen intercalada */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-0">
        {filtered.map((srv, i) => {
          const Icon = srv.icon;
          const imageRight = i % 2 === 0;
          return (
            <div
              key={srv.title}
              className={`grid grid-cols-1 lg:grid-cols-2 border-b border-white/10 last:border-b-0 ${
                srv.accent ? "bg-white/[0.02]" : ""
              }`}
            >
              {/* Imagen */}
              <div className={`overflow-hidden bg-gray-900 ${imageRight ? "lg:order-2" : "lg:order-1"}`}>
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-72 lg:h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                  style={{ minHeight: "320px" }}
                />
              </div>

              {/* Contenido */}
              <div className={`flex flex-col justify-center px-10 lg:px-16 py-14 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] tracking-[0.3em] text-red-600 font-semibold">{srv.category}</span>
                  {srv.accent && (
                    <span className="text-[9px] tracking-[0.2em] text-white/40 border border-white/20 px-2 py-0.5">ÁREA CORE</span>
                  )}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-2.5 border flex-shrink-0 ${srv.accent ? "border-red-600/50 text-red-500" : "border-white/15 text-gray-500"}`}>
                    <Icon size={20} />
                  </div>
                  <h2 className="text-white font-bold text-2xl leading-tight">{srv.title}</h2>
                </div>

                <p className="text-gray-400 text-base leading-relaxed mb-8">{srv.description}</p>

                <ul className="space-y-2.5 mb-10">
                  {srv.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-500 text-sm">
                      <span className="text-red-600 mt-1 flex-shrink-0 text-xs">→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openWhatsApp}
                  className="self-start text-[10px] tracking-[0.2em] text-white border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all flex items-center gap-2"
                >
                  CONSULTAR ESTE SERVICIO <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-700 text-sm tracking-wider">No hay servicios en esta categoría.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] border-t border-white/10 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>¿LISTO PARA TRABAJAR?</SectionLabel>
          <h2 className="text-white font-display text-3xl font-bold mb-4">Hablemos de su desafío</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Cada proyecto es único. Cuéntenos su situación y diseñamos la estrategia correcta.
          </p>
          <button
            onClick={openWhatsApp}
            className="bg-red-600 text-white text-xs tracking-[0.2em] px-10 py-4 hover:bg-red-700 transition-colors"
          >
            INICIAR CONVERSACIÓN
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CREDENCIALES PAGE ──────────────────────────────────────────────────────────

function CredencialesPage() {
  const [form, setForm] = useState({ nombres: "", apellidos: "", telefono: "", correo: "" });
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombres.trim()) e.nombres = "Requerido";
    if (!form.apellidos.trim()) e.apellidos = "Requerido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.correo.trim()) e.correo = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = "Correo inválido";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setReady(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] border text-white text-sm px-4 py-3.5 placeholder-gray-700 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500/70 focus:border-red-500" : "border-white/10 focus:border-red-600"
    }`;

  return (
    <div className="bg-black pt-24">
      {/* Hero */}
      <section className="relative py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=1600&h=500&fit=crop&auto=format"
            alt="Infraestructura"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>CREDENCIALES</SectionLabel>
          <h1 className="text-white font-display text-3xl lg:text-4xl font-bold max-w-2xl leading-tight mb-4">
            Experiencia que construye confianza
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Acceda a nuestro documento de credenciales con casos, metodologías y resultados.
          </p>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Izquierda — descripción del documento */}
          <div>
            <div className="border border-white/10 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                  <Download size={22} className="text-red-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Credenciales Media & Crisis</p>
                  <p className="text-gray-600 text-xs mt-0.5 tracking-wider">PDF · Confidencial</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Documento de presentación institucional que incluye nuestra propuesta de valor, casos de gestión de crisis, sectores atendidos, metodología de trabajo y equipo directivo.
              </p>
              <div className="space-y-2.5">
                {[
                  "Más de 20 casos documentados por sector",
                  "Metodología de gestión de crisis en 5 fases",
                  "Resultados y métricas de impacto reputacional",
                  "Sectores: minería, energía, infraestructura, puertos",
                  "Perfil del equipo y trayectoria",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-red-600 mt-0.5 flex-shrink-0">·</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <p className="text-gray-600 text-xs leading-relaxed">
                <span className="text-gray-400">Confidencialidad.</span>{" "}
                Este documento es de uso exclusivo para la persona que lo solicita. Su distribución no autorizada está prohibida.
              </p>
            </div>
          </div>

          {/* Derecha — formulario o botón de descarga */}
          <div>
            {!ready ? (
              <div>
                <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-8">
                  Complete el formulario para acceder al documento
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                        NOMBRES *
                      </label>
                      <input
                        value={form.nombres}
                        onChange={(e) => { setForm({ ...form, nombres: e.target.value }); setErrors({ ...errors, nombres: "" }); }}
                        placeholder="Sus nombres"
                        className={inputClass("nombres")}
                      />
                      {errors.nombres && <p className="text-red-500 text-[10px] mt-1">{errors.nombres}</p>}
                    </div>
                    <div>
                      <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                        APELLIDOS *
                      </label>
                      <input
                        value={form.apellidos}
                        onChange={(e) => { setForm({ ...form, apellidos: e.target.value }); setErrors({ ...errors, apellidos: "" }); }}
                        placeholder="Sus apellidos"
                        className={inputClass("apellidos")}
                      />
                      {errors.apellidos && <p className="text-red-500 text-[10px] mt-1">{errors.apellidos}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                      NÚMERO DE TELÉFONO *
                    </label>
                    <input
                      value={form.telefono}
                      onChange={(e) => { setForm({ ...form, telefono: e.target.value }); setErrors({ ...errors, telefono: "" }); }}
                      placeholder="+51 ..."
                      type="tel"
                      className={inputClass("telefono")}
                    />
                    {errors.telefono && <p className="text-red-500 text-[10px] mt-1">{errors.telefono}</p>}
                  </div>

                  <div>
                    <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                      CORREO ELECTRÓNICO *
                    </label>
                    <input
                      value={form.correo}
                      onChange={(e) => { setForm({ ...form, correo: e.target.value }); setErrors({ ...errors, correo: "" }); }}
                      placeholder="correo@empresa.com"
                      type="email"
                      className={inputClass("correo")}
                    />
                    {errors.correo && <p className="text-red-500 text-[10px] mt-1">{errors.correo}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white text-xs tracking-[0.2em] py-4 hover:bg-red-700 transition-colors mt-2"
                  >
                    ACCEDER AL DOCUMENTO
                  </button>

                  <p className="text-gray-700 text-[10px] text-center leading-relaxed">
                    Su información es confidencial y no será compartida con terceros.
                  </p>
                </form>
              </div>
            ) : (
              <div className="border border-white/10 p-10 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <p className="text-gray-500 text-[10px] tracking-[0.25em] mb-3">ACCESO HABILITADO</p>
                <h3 className="text-white font-display text-2xl font-bold mb-3">
                  Gracias, {form.nombres}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                  Su documento de credenciales está listo. También le enviamos una copia a{" "}
                  <span className="text-white">{form.correo}</span>.
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center gap-3 bg-red-600 text-white text-xs tracking-[0.2em] px-10 py-4 hover:bg-red-700 transition-colors w-full mb-4"
                >
                  <Download size={14} />
                  DESCARGAR CREDENCIALES (PDF)
                </a>
                <button
                  onClick={() => { setReady(false); setForm({ nombres: "", apellidos: "", telefono: "", correo: "" }); }}
                  className="text-gray-700 text-[10px] tracking-wider hover:text-gray-500 transition-colors"
                >
                  Volver al formulario
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── BLOG PAGE ───────────────────────────────────────────────────────────────

const ALL_POSTS = [
  {
    category: "INFRAESTRUCTURA",
    title: "Infraestructura en el Perú: oportunidad histórica, riesgos reales",
    date: "Junio 2026",
    excerpt: "Las grandes obras de infraestructura abren ventanas de crecimiento únicas, pero concentran riesgos reputacionales que pocas organizaciones saben anticipar.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop&auto=format",
    featured: true,
  },
  {
    category: "GESTIÓN DE CRISIS",
    title: "Lecciones de crisis en proyectos portuarios",
    date: "Mayo 2026",
    excerpt: "Tres casos reales de puertos latinoamericanos revelan patrones comunes de escalada y los puntos de inflexión donde la comunicación marca la diferencia.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=600&fit=crop&auto=format",
    featured: true,
  },
  {
    category: "RIESGO REPUTACIONAL",
    title: "Cómo medir el riesgo reputacional en proyectos de alta exposición",
    date: "Mayo 2026",
    excerpt: "Un modelo de auditoría reputacional aplicado al sector minero-energético permite cuantificar la exposición antes de que el conflicto estalle.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&h=600&fit=crop&auto=format",
    featured: true,
  },
  {
    category: "ASUNTOS PÚBLICOS",
    title: "Relaciones comunitarias estratégicas: del conflicto a la confianza",
    date: "Abril 2026",
    excerpt: "Transformar la relación con comunidades afectadas por proyectos extractivos requiere más que consulta previa: exige presencia, narrativa y continuidad.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
  {
    category: "MANEJO DE CRISIS",
    title: "Preparación y respuesta: la diferencia entre controlar o amplificar una crisis",
    date: "Abril 2026",
    excerpt: "Las organizaciones que practican simulacros antes de necesitarlos responden 60% más rápido cuando el escenario real ocurre.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
  {
    category: "INFRAESTRUCTURA",
    title: "El modelo de licencia social en proyectos de gran escala",
    date: "Marzo 2026",
    excerpt: "Análisis del modelo de licencia social aplicado a proyectos con impacto territorial en zonas de alta sensibilidad política.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
  {
    category: "GESTIÓN DE CRISIS",
    title: "Comunicación en crisis ambientales: el peso de las primeras 4 horas",
    date: "Febrero 2026",
    excerpt: "La velocidad de respuesta en los primeros momentos determina la trayectoria de la narrativa pública durante semanas.",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
  {
    category: "ASUNTOS PÚBLICOS",
    title: "Agenda pública y proyectos de inversión: navegar el ciclo electoral",
    date: "Enero 2026",
    excerpt: "Cómo mantener la licencia operativa durante transiciones de gobierno sin perder terreno en la agenda regulatoria.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
  {
    category: "RIESGO REPUTACIONAL",
    title: "Reputación corporativa en tiempos de redes sociales y viralidad",
    date: "Diciembre 2025",
    excerpt: "El riesgo reputacional en la era digital escala en minutos. Las organizaciones que no tienen protocolos digitales pagan el precio.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&h=600&fit=crop&auto=format",
    featured: false,
  },
];

const BLOG_CATEGORIES = ["TODOS", "INFRAESTRUCTURA", "GESTIÓN DE CRISIS", "RIESGO REPUTACIONAL", "ASUNTOS PÚBLICOS", "MANEJO DE CRISIS"];
const PAGE_SIZE = 6;

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const featured = ALL_POSTS.filter((p) => p.featured).slice(0, 3);
  const filtered = (activeCategory === "TODOS" ? ALL_POSTS : ALL_POSTS.filter((p) => p.category === activeCategory));
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="bg-white pt-24">

      {/* ── HERO EDITORIAL ─────────────────────────────── */}
      <section className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <SectionLabel>BLOG</SectionLabel>
              <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-tight">
                Ideas para anticipar lo que viene
              </h1>
            </div>
            <div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Análisis, perspectivas y herramientas para organizaciones que operan en entornos de alta exposición reputacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LO ÚLTIMO (tarjetas horizontales) ─────────── */}
      <section className="bg-black border-b border-white/10 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-gray-600 text-[9px] tracking-[0.35em] uppercase pb-6 border-b border-white/10 mb-0">
            LO ÚLTIMO
          </p>
          <div className="divide-y divide-white/10">
            {featured.map((post, i) => (
              <article key={i} className="group cursor-pointer py-8 grid grid-cols-1 md:grid-cols-5 gap-6 hover:bg-white/[0.02] transition-all -mx-4 px-4">
                {/* Imagen */}
                <div className="md:col-span-2 overflow-hidden bg-gray-900 flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    style={{ minHeight: "160px" }}
                  />
                </div>
                {/* Texto */}
                <div className="md:col-span-3 flex flex-col justify-center gap-3">
                  <p className="text-red-600 text-[9px] font-bold tracking-[0.3em]">{post.category}</p>
                  <h2 className="text-white font-bold text-xl lg:text-2xl leading-snug group-hover:text-red-100 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-auto">
                    <span className="text-gray-600 text-xs tracking-wider">{post.date}</span>
                    <span className="text-red-600 text-xs tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                      LEER <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTROS + GRILLA ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">

        {/* Pills de categoría */}
        <div className="flex gap-2 flex-wrap mb-12 pb-8 border-b border-gray-100">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[10px] tracking-[0.15em] px-5 py-2 transition-all font-medium ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {shown.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden bg-gray-100 mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-red-600 text-[9px] font-bold tracking-[0.3em] mb-2">{post.category}</p>
              <h3 className="text-black font-bold text-lg leading-snug mb-3 group-hover:text-red-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-gray-400 text-xs">{post.date}</span>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>

        {/* Ver más */}
        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="border border-black text-black text-xs tracking-[0.2em] px-12 py-4 hover:bg-black hover:text-white transition-all"
            >
              VER MÁS
            </button>
          </div>
        )}

        {shown.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-sm tracking-wider">No hay artículos en esta categoría.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── NOSOTROS PAGE ───────────────────────────────────────────────────────────

function NosotrosPage({ setActivePage }: { setActivePage: (p: Page) => void }) {
  const trayectoria = [
    {
      periodo: "2021 — Presente",
      cargo: "Fundador & Director General",
      empresa: "Media & Crisis",
      desc: "Lidera la firma especializada en gestión de reputación y crisis para organizaciones de infraestructura crítica en el Perú y la región andina.",
    },
    {
      periodo: "2017 — 2021",
      cargo: "Director de Comunicaciones",
      empresa: "Efecto Estrategia Comunicaciones",
      desc: "Responsable de las cuentas corporativas de mayor complejidad: energía, minería y transporte. Gestionó más de 40 crisis reputacionales de alta exposición.",
    },
    {
      periodo: "2013 — 2017",
      cargo: "Asesor Senior de Asuntos Públicos",
      empresa: "Ministerio de Transportes y Comunicaciones",
      desc: "Asesoría en comunicación institucional y gestión de conflictos sociales vinculados a proyectos de infraestructura vial y portuaria.",
    },
    {
      periodo: "2009 — 2013",
      cargo: "Periodista de Investigación",
      empresa: "Diario El Comercio — Perú",
      desc: "Cobertura de política, economía e infraestructura. Premio Nacional de Periodismo de Investigación 2012 por reportaje sobre concesiones viales.",
    },
  ];

  const apariciones = [
    { medio: "El Comercio", tema: "Gestión de crisis reputacional en el sector minero" },
    { medio: "RPP Noticias", tema: "Comunicación en emergencias de infraestructura" },
    { medio: "Gestión", tema: "Cómo proteger la reputación en proyectos de inversión" },
    { medio: "América TV", tema: "Conflictos sociales y licencia social en el Perú" },
    { medio: "Semana Económica", tema: "El rol de la comunicación en la crisis portuaria" },
    { medio: "CNN en Español", tema: "Manejo de crisis en Latinoamérica" },
  ];

  return (
    <div className="bg-black">
      {/* HERO — perfil de portada */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=900&fit=crop&auto=format"
            alt="César Cárdenas en entorno de infraestructura"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Foto + datos */}
          <div className="flex flex-col gap-8">
            <div className="flex items-end gap-10">
              {/* Foto grande con efecto duotono */}
              <div className="relative flex-shrink-0 w-[220px] h-[280px] lg:w-[260px] lg:h-[340px] overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=520&h=680&fit=crop&auto=format&facepad=3&faces=1"
                  alt="César Cárdenas"
                  className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-90"
                />
                {/* Gradiente inferior que fusiona con el fondo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Línea roja sutil en la base */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600" />
              </div>
              <div className="pb-2">
                <p className="text-red-600 text-[10px] tracking-[0.3em] font-semibold mb-3">FUNDADOR · MEDIA & CRISIS</p>
                <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-none mb-3">
                  César<br />Cárdenas
                </h1>
                <p className="text-gray-400 text-sm tracking-wide">
                  Estratega de reputación y gestión de crisis
                </p>
              </div>
            </div>

            {/* Indicadores rápidos */}
            <div className="grid grid-cols-3 gap-0 border border-white/10 max-w-md">
              {[
                { n: "15+", l: "Años" },
                { n: "+80", l: "Crisis" },
                { n: "6", l: "Países" },
              ].map((s, i) => (
                <div key={i} className="p-5 border-r border-white/10 last:border-r-0 text-center">
                  <div className="text-white font-display text-3xl font-bold">{s.n}</div>
                  <div className="text-gray-600 text-[10px] tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-red-600 text-white text-xs tracking-[0.2em] px-7 py-3.5 hover:bg-red-700 transition-colors"
              >
                ESCRIBIR A CÉSAR
              </button>
              <a
                href="#"
                className="border border-white/30 text-white text-xs tracking-[0.2em] px-7 py-3.5 hover:border-white transition-colors flex items-center gap-2"
              >
                <Linkedin size={13} />
                LINKEDIN
              </a>
            </div>
          </div>

          {/* Frase */}
          <div className="lg:pb-4">
            <blockquote className="border-l-2 border-red-600 pl-8">
              <p className="text-white font-display text-2xl lg:text-3xl font-bold italic leading-snug mb-4">
                "La reputación no se construye en la calma. Se demuestra en la crisis."
              </p>
              <cite className="text-gray-600 text-xs tracking-widest not-italic">
                — CÉSAR CÁRDENAS
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* BIOGRAFÍA */}
      <section className="bg-[#0D0D0D] border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <SectionLabel>PERFIL</SectionLabel>
            <h2 className="text-white font-display text-4xl font-bold mb-8 leading-tight">
              Quince años protegiendo lo que más importa
            </h2>
            <div className="space-y-5 text-gray-400 text-base leading-relaxed">
              <p>
                César Cárdenas es uno de los estrategas de comunicación de crisis más reconocidos del Perú. Con formación en periodismo de investigación y más de quince años acompañando organizaciones en momentos de alta presión reputacional, fundó <strong className="text-white">Media & Crisis</strong> para responder a una necesidad que el mercado no atendía: asesoría especializada, honesta y ejecutable para sectores de infraestructura crítica.
              </p>
              <p>
                Su trayectoria incluye la gestión de crisis en proyectos mineros, portuarios, energéticos y de construcción vial en el Perú, Colombia, Ecuador y Bolivia. Ha asesorado a directorios, gerencias generales y equipos de comunicación en situaciones que van desde accidentes industriales hasta conflictos sociales de alta visibilidad mediática.
              </p>
              <p>
                Antes de fundar Media & Crisis, dirigió la práctica corporativa de Efecto Estrategia Comunicaciones y fue asesor del Ministerio de Transportes durante el período de mayor expansión de concesiones viales en el país. Es egresado de la Pontificia Universidad Católica del Perú y tiene una especialización en gestión de crisis por la Universidad de Nueva York.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/10 p-6">
              <p className="text-gray-700 text-[9px] tracking-[0.3em] mb-5">ESPECIALIDADES</p>
              <div className="space-y-3">
                {[
                  "Gestión de crisis reputacional",
                  "Relaciones con comunidades",
                  "Asuntos públicos y regulatorios",
                  "Media training ejecutivo",
                  "Auditorías de riesgo reputacional",
                  "Licencia social en proyectos",
                ].map((esp, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="w-1 h-1 bg-red-600 flex-shrink-0 rounded-full" />
                    {esp}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-gray-700 text-[9px] tracking-[0.3em] mb-5">FORMACIÓN</p>
              <div className="space-y-4">
                {[
                  { titulo: "Especialización en Crisis Management", inst: "New York University" },
                  { titulo: "Licenciatura en Periodismo", inst: "PUCP — Lima, Perú" },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-white text-sm font-medium">{f.titulo}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{f.inst}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-white/10">
        <SectionLabel>TRAYECTORIA</SectionLabel>
        <h2 className="text-white font-display text-4xl font-bold mb-16">
          Una carrera construida en el campo
        </h2>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
          <div className="space-y-0">
            {trayectoria.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 py-10 border-b border-white/10 last:border-b-0 group lg:pl-8 hover:bg-white/[0.02] transition-all"
              >
                <div>
                  <p className="text-red-600 text-[10px] tracking-[0.2em] font-semibold mb-1">{item.periodo}</p>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-white font-bold text-lg mb-1">{item.cargo}</h3>
                  <p className="text-gray-500 text-xs tracking-wider mb-3">{item.empresa}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APARICIONES EN MEDIOS */}
      <section className="bg-[#0D0D0D] border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>EN LOS MEDIOS</SectionLabel>
          <h2 className="text-white font-display text-4xl font-bold mb-16">
            Voz de referencia en comunicación de crisis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {apariciones.map((ap, i) => (
              <div
                key={i}
                className="p-7 border-b border-r border-white/10 last:border-b-0 hover:bg-white/[0.03] transition-all group cursor-pointer"
                style={{ borderRight: (i + 1) % 3 === 0 ? "none" : undefined }}
              >
                <p className="text-red-600 text-[10px] font-bold tracking-[0.25em] mb-3">{ap.medio}</p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {ap.tema}
                </p>
                <ArrowRight size={13} className="text-gray-700 mt-4 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="bg-black border-t border-white/10 py-28">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>¿TRABAJAMOS JUNTOS?</SectionLabel>
            <h2 className="text-white font-display text-4xl font-bold mb-4 leading-tight">
              Hable directamente con César
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Cada conversación es confidencial. Si su organización enfrenta un desafío reputacional, el momento de hablar es antes de que escale.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => openWhatsApp()}
              className="bg-red-600 text-white text-xs tracking-[0.2em] px-10 py-4 hover:bg-red-700 transition-colors text-center"
            >
              AGENDAR CONVERSACIÓN
            </button>
            <a
              href="mailto:cesar@mediacrisis.pe"
              className="border border-white/20 text-white text-xs tracking-[0.2em] px-10 py-4 hover:border-white transition-colors text-center flex items-center justify-center gap-2"
            >
              <Mail size={13} className="text-red-600" />
              cesar@mediacrisis.pe
            </a>
            <a
              href="#"
              className="border border-white/20 text-white text-xs tracking-[0.2em] px-10 py-4 hover:border-white transition-colors text-center flex items-center justify-center gap-2"
            >
              <Linkedin size={13} className="text-red-600" />
              /in/cesarcardenas
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage setActivePage={setActivePage} />;
      case "servicios":
        return <ServiciosPage setActivePage={setActivePage} />;
      case "credenciales":
        return <CredencialesPage />;
      case "blog":
        return <BlogPage />;
      case "nosotros":
        return <NosotrosPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main>{renderPage()}</main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
