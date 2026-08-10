import { useState } from "react";
import { Download } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/lib/supabase";

export default function Credenciales() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
  });
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombres.trim()) e.nombres = "Requerido";
    if (!form.apellidos.trim()) e.apellidos = "Requerido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.correo.trim()) e.correo = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      e.correo = "Correo inválido";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setSending(true);
    try {
      await supabase.from("credencial_requests").insert({
        nombres: form.nombres,
        apellidos: form.apellidos,
        telefono: form.telefono,
        correo: form.correo,
      });
      setReady(true);
    } catch (err) {
      console.error("Error submitting credencial request:", err);
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] border text-white text-sm px-4 py-3.5 placeholder-gray-700 focus:outline-none transition-colors ${
      errors[field]
        ? "border-red-500/70 focus:border-red-500"
        : "border-white/10 focus:border-red-600"
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
                  <p className="text-white font-bold text-base">
                    Credenciales Media & Crisis
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5 tracking-wider">
                    PDF · Confidencial
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Documento de presentación institucional que incluye nuestra propuesta
                de valor, casos de gestión de crisis, sectores atendidos, metodología
                de trabajo y equipo directivo.
              </p>
              <div className="space-y-2.5">
                {[
                  "Más de 20 casos documentados por sector",
                  "Metodología de gestión de crisis en 5 fases",
                  "Resultados y métricas de impacto reputacional",
                  "Sectores: minería, energía, infraestructura, puertos",
                  "Perfil del equipo y trayectoria",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-gray-400 text-sm"
                  >
                    <span className="text-red-600 mt-0.5 flex-shrink-0">·</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <p className="text-gray-600 text-xs leading-relaxed">
                <span className="text-gray-400">Confidencialidad.</span>{" "}
                Este documento es de uso exclusivo para la persona que lo solicita.
                Su distribución no autorizada está prohibida.
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
                        onChange={(e) => {
                          setForm({ ...form, nombres: e.target.value });
                          setErrors({ ...errors, nombres: "" });
                        }}
                        placeholder="Sus nombres"
                        className={inputClass("nombres")}
                      />
                      {errors.nombres && (
                        <p className="text-red-500 text-[10px] mt-1">
                          {errors.nombres}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                        APELLIDOS *
                      </label>
                      <input
                        value={form.apellidos}
                        onChange={(e) => {
                          setForm({ ...form, apellidos: e.target.value });
                          setErrors({ ...errors, apellidos: "" });
                        }}
                        placeholder="Sus apellidos"
                        className={inputClass("apellidos")}
                      />
                      {errors.apellidos && (
                        <p className="text-red-500 text-[10px] mt-1">
                          {errors.apellidos}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                      NÚMERO DE TELÉFONO *
                    </label>
                    <input
                      value={form.telefono}
                      onChange={(e) => {
                        setForm({ ...form, telefono: e.target.value });
                        setErrors({ ...errors, telefono: "" });
                      }}
                      placeholder="+51 ..."
                      type="tel"
                      className={inputClass("telefono")}
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {errors.telefono}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
                      CORREO ELECTRÓNICO *
                    </label>
                    <input
                      value={form.correo}
                      onChange={(e) => {
                        setForm({ ...form, correo: e.target.value });
                        setErrors({ ...errors, correo: "" });
                      }}
                      placeholder="correo@empresa.com"
                      type="email"
                      className={inputClass("correo")}
                    />
                    {errors.correo && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {errors.correo}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-red-600 text-white text-xs tracking-[0.2em] py-4 hover:bg-red-700 transition-colors mt-2 disabled:opacity-50"
                  >
                    {sending ? "PROCESANDO..." : "ACCEDER AL DOCUMENTO"}
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
                <p className="text-gray-500 text-[10px] tracking-[0.25em] mb-3">
                  ACCESO HABILITADO
                </p>
                <h3 className="text-white font-display text-2xl font-bold mb-3">
                  Gracias, {form.nombres}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                  Su documento de credenciales está listo. También le enviamos una
                  copia a{" "}
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
                  onClick={() => {
                    setReady(false);
                    setForm({
                      nombres: "",
                      apellidos: "",
                      telefono: "",
                      correo: "",
                    });
                  }}
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
