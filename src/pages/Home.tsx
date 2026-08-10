import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, ChevronRight, Megaphone, Shield,
  BookOpen, BarChart2, Calendar, Linkedin, Mail
} from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

const WA_URL =
  "https://wa.me/51999123456?text=Hola%2C%20me%20gustar%C3%ADa%20conversar%20con%20Media%20%26%20Crisis.";
const openWhatsApp = () => window.open(WA_URL, "_blank");

// ─── DATA ────────────────────────────────────────────────────────────────────

const capabilities = [
  {
    icon: Megaphone,
    title: "RELACIONES PÚBLICAS",
    items: [
      "Gestión de Prensa", "Asuntos Públicos",
      "Relaciones Comunitarias", "Softlanding en Perú",
    ],
    accent: false,
  },
  {
    icon: Calendar,
    title: "MARKETING Y EVENTOS",
    items: [
      "Marketing y Publicidad", "Gestión de Prensa",
      "Producción de Eventos", "BTL", "Producción Audiovisual",
    ],
    accent: false,
  },
  {
    icon: Shield,
    title: "MANEJO DE CRISIS Y RIESGOS",
    items: [
      "Auditorías de Riesgo Reputacional para compliance",
      "Prevención de Riesgos y Crisis Reputacional",
      "Gestión Social y Prevención de Conflictos",
      "Protocolos de Crisis", "Gestión de Crisis",
    ],
    accent: true,
  },
  {
    icon: BookOpen,
    title: "TALLERES Y ENTRENAMIENTOS",
    items: [
      "Media Training", "Simulacro de Crisis",
      "Capacitación de protocolos",
      "Inducción política y social del país",
    ],
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

// ─── HERO SLIDER ─────────────────────────────────────────────────────────────

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === active) return;
      setPrev(active);
      setActive(idx);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [active, animating]
  );

  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prevSlide = useCallback(
    () => goTo((active - 1 + SLIDES.length) % SLIDES.length),
    [active, goTo]
  );

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, next]);

  const slide = SLIDES[active];

  return (
    <section className="relative min-h-screen flex items-end pb-28 overflow-hidden">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === active ? 1 : i === prev ? 0 : 0,
            zIndex: i === active ? 1 : i === prev ? 0 : -1,
          }}
        >
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>
      ))}

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
                {i === slide.accent ? (
                  <span className="text-red-600 italic">{line}</span>
                ) : (
                  line
                )}
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
            <Link
              to="/servicios"
              className="bg-red-600 text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-red-700 transition-colors"
            >
              VER SERVICIOS
            </Link>
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
          <span className="text-gray-600 text-xs tracking-widest">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={prevSlide}
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

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSlider />

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
                      cap.accent
                        ? "text-red-500"
                        : "text-gray-600 group-hover:text-gray-400"
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
            <Link
              to="/servicios"
              className="text-[10px] text-gray-600 tracking-[0.2em] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              VER TODOS LOS SERVICIOS <ArrowRight size={12} />
            </Link>
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
            Conozca cómo hemos acompañado a organizaciones en proyectos críticos
            del país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/credenciales"
              className="border border-white text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all"
            >
              VER CREDENCIALES
            </Link>
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
              <h2 className="text-black text-4xl font-bold">
                Ideas para anticipar lo que viene
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-[10px] text-gray-400 tracking-[0.2em] hover:text-red-600 transition-colors flex items-center gap-1.5 pb-1 flex-shrink-0"
            >
              VER TODOS <ChevronRight size={13} />
            </Link>
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
