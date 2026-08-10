import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Shield, BookOpen, BarChart2, Calendar } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

const WA_URL =
  "https://wa.me/51999123456?text=Hola%2C%20me%20gustar%C3%ADa%20conversar%20con%20Media%20%26%20Crisis.";
const openWhatsApp = () => window.open(WA_URL, "_blank");

const SERVICIOS_DATA = [
  {
    category: "COMUNICACIÓN",
    title: "Relaciones Públicas",
    description:
      "Construimos y mantenemos la presencia de su organización en medios, comunidades y entornos institucionales de alta complejidad.",
    items: [
      "Gestión de Prensa",
      "Asuntos Públicos",
      "Relaciones Comunitarias",
      "Softlanding en Perú",
    ],
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=600&fit=crop&auto=format",
    icon: Megaphone,
    accent: false,
  },
  {
    category: "COMUNICACIÓN",
    title: "Marketing y Eventos",
    description:
      "Diseñamos campañas y experiencias que posicionan a su organización como referente en sectores de infraestructura y alta exposición.",
    items: [
      "Marketing y Publicidad",
      "Gestión de Prensa",
      "Producción de Eventos",
      "BTL",
      "Producción Audiovisual",
    ],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop&auto=format",
    icon: Calendar,
    accent: false,
  },
  {
    category: "CRISIS",
    title: "Manejo de Crisis y Riesgos",
    description:
      "Nuestra capacidad core. Anticipamos, contenemos y revertimos situaciones de crisis reputacional en los entornos más exigentes del Perú y la región.",
    items: [
      "Auditorías de Riesgo Reputacional para compliance",
      "Prevención de Riesgos y Crisis Reputacional",
      "Gestión Social y Prevención de Conflictos",
      "Protocolos de Crisis",
      "Gestión de Crisis",
    ],
    image:
      "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=900&h=600&fit=crop&auto=format",
    icon: Shield,
    accent: true,
  },
  {
    category: "FORMACIÓN",
    title: "Talleres y Entrenamientos",
    description:
      "Preparamos a equipos directivos y de comunicaciones para responder con eficacia ante escenarios de crisis, presión mediática y conflicto social.",
    items: [
      "Media Training",
      "Simulacro de Crisis",
      "Capacitación de protocolos",
      "Inducción política y social del país",
    ],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=600&fit=crop&auto=format",
    icon: BookOpen,
    accent: false,
  },
  {
    category: "AUDITORÍA",
    title: "Auditorías Reputacionales",
    description:
      "Medimos el estado real de su reputación corporativa con metodología propia, identificando vulnerabilidades antes de que se conviertan en crisis.",
    items: [
      "Auditorías de Riesgo Reputacional para compliance",
      "Auditorías de Percepción con líderes de opinión",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
    icon: BarChart2,
    accent: false,
  },
];

const SERVICIOS_CATS = ["TODOS", "COMUNICACIÓN", "CRISIS", "FORMACIÓN", "AUDITORÍA"];

export default function Servicios() {
  const [activeCategory, setActiveCategory] = useState("TODOS");

  const filtered =
    activeCategory === "TODOS"
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
              <div
                className={`overflow-hidden bg-gray-900 ${
                  imageRight ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-72 lg:h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                  style={{ minHeight: "320px" }}
                />
              </div>

              <div
                className={`flex flex-col justify-center px-10 lg:px-16 py-14 ${
                  imageRight ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] tracking-[0.3em] text-red-600 font-semibold">
                    {srv.category}
                  </span>
                  {srv.accent && (
                    <span className="text-[9px] tracking-[0.2em] text-white/40 border border-white/20 px-2 py-0.5">
                      ÁREA CORE
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-2.5 border flex-shrink-0 ${
                      srv.accent
                        ? "border-red-600/50 text-red-500"
                        : "border-white/15 text-gray-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="text-white font-bold text-2xl leading-tight">
                    {srv.title}
                  </h2>
                </div>

                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  {srv.description}
                </p>

                <ul className="space-y-2.5 mb-10">
                  {srv.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-gray-500 text-sm"
                    >
                      <span className="text-red-600 mt-1 flex-shrink-0 text-xs">
                        →
                      </span>
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
            <p className="text-gray-700 text-sm tracking-wider">
              No hay servicios en esta categoría.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] border-t border-white/10 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>¿LISTO PARA TRABAJAR?</SectionLabel>
          <h2 className="text-white font-display text-3xl font-bold mb-4">
            Hablemos de su desafío
          </h2>
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
