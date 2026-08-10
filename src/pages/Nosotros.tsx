import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

const WA_URL =
  "https://wa.me/51999123456?text=Hola%2C%20me%20gustar%C3%ADa%20conversar%20con%20Media%20%26%20Crisis.";
const openWhatsApp = () => window.open(WA_URL, "_blank");

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
  {
    medio: "El Comercio",
    tema: "Gestión de crisis reputacional en el sector minero",
  },
  {
    medio: "RPP Noticias",
    tema: "Comunicación en emergencias de infraestructura",
  },
  {
    medio: "Gestión",
    tema: "Cómo proteger la reputación en proyectos de inversión",
  },
  {
    medio: "América TV",
    tema: "Conflictos sociales y licencia social en el Perú",
  },
  {
    medio: "Semana Económica",
    tema: "El rol de la comunicación en la crisis portuaria",
  },
  { medio: "CNN en Español", tema: "Manejo de crisis en Latinoamérica" },
];

export default function Nosotros() {
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
              <div className="relative flex-shrink-0 w-[220px] h-[280px] lg:w-[260px] lg:h-[340px] overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=520&h=680&fit=crop&auto=format&facepad=3&faces=1"
                  alt="César Cárdenas"
                  className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600" />
              </div>
              <div className="pb-2">
                <p className="text-red-600 text-[10px] tracking-[0.3em] font-semibold mb-3">
                  FUNDADOR · MEDIA & CRISIS
                </p>
                <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-none mb-3">
                  César
                  <br />
                  Cárdenas
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
                <div
                  key={i}
                  className="p-5 border-r border-white/10 last:border-r-0 text-center"
                >
                  <div className="text-white font-display text-3xl font-bold">
                    {s.n}
                  </div>
                  <div className="text-gray-600 text-[10px] tracking-wider mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={openWhatsApp}
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
                "La reputación no se construye en la calma. Se demuestra en la
                crisis."
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
                César Cárdenas es uno de los estrategas de comunicación de
                crisis más reconocidos del Perú. Con formación en periodismo de
                investigación y más de quince años acompañando organizaciones en
                momentos de alta presión reputacional, fundó{" "}
                <strong className="text-white">Media & Crisis</strong> para
                responder a una necesidad que el mercado no atendía: asesoría
                especializada, honesta y ejecutable para sectores de
                infraestructura crítica.
              </p>
              <p>
                Su trayectoria incluye la gestión de crisis en proyectos
                mineros, portuarios, energéticos y de construcción vial en el
                Perú, Colombia, Ecuador y Bolivia. Ha asesorado a directorios,
                gerencias generales y equipos de comunicación en situaciones que
                van desde accidentes industriales hasta conflictos sociales de
                alta visibilidad mediática.
              </p>
              <p>
                Antes de fundar Media & Crisis, dirigió la práctica corporativa
                de Efecto Estrategia Comunicaciones y fue asesor del Ministerio
                de Transportes durante el período de mayor expansión de
                concesiones viales en el país. Es egresado de la Pontificia
                Universidad Católica del Perú y tiene una especialización en
                gestión de crisis por la Universidad de Nueva York.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/10 p-6">
              <p className="text-gray-700 text-[9px] tracking-[0.3em] mb-5">
                ESPECIALIDADES
              </p>
              <div className="space-y-3">
                {[
                  "Gestión de crisis reputacional",
                  "Relaciones con comunidades",
                  "Asuntos públicos y regulatorios",
                  "Media training ejecutivo",
                  "Auditorías de riesgo reputacional",
                  "Licencia social en proyectos",
                ].map((esp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <span className="w-1 h-1 bg-red-600 flex-shrink-0 rounded-full" />
                    {esp}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-gray-700 text-[9px] tracking-[0.3em] mb-5">
                FORMACIÓN
              </p>
              <div className="space-y-4">
                {[
                  {
                    titulo: "Especialización en Crisis Management",
                    inst: "New York University",
                  },
                  {
                    titulo: "Licenciatura en Periodismo",
                    inst: "PUCP — Lima, Perú",
                  },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-white text-sm font-medium">
                      {f.titulo}
                    </p>
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
                  <p className="text-red-600 text-[10px] tracking-[0.2em] font-semibold mb-1">
                    {item.periodo}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.cargo}
                  </h3>
                  <p className="text-gray-500 text-xs tracking-wider mb-3">
                    {item.empresa}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
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
                className="p-7 border-b border-r border-white/10 hover:bg-white/[0.03] transition-all group cursor-pointer"
                style={{
                  borderRight:
                    (i + 1) % 3 === 0 ? "none" : undefined,
                  borderBottom:
                    i >= apariciones.length - 3 ? "none" : undefined,
                }}
              >
                <p className="text-red-600 text-[10px] font-bold tracking-[0.25em] mb-3">
                  {ap.medio}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {ap.tema}
                </p>
                <ArrowRight
                  size={13}
                  className="text-gray-700 mt-4 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
                />
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
              Cada conversación es confidencial. Si su organización enfrenta un
              desafío reputacional, el momento de hablar es antes de que escale.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={openWhatsApp}
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
