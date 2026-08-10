import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "SERVICIOS", path: "/servicios" },
  { label: "CREDENCIALES", path: "/credenciales" },
  { label: "BLOG", path: "/blog" },
  { label: "NOSOTROS", path: "/nosotros" },
];

export function Footer() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    cargo: "",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await supabase.from("contact_submissions").insert({
        nombre: form.nombre,
        empresa: form.empresa || null,
        correo: form.correo,
        cargo: form.cargo || null,
        mensaje: form.mensaje || null,
      });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ nombre: "", empresa: "", correo: "", cargo: "", mensaje: "" });
    } catch (err) {
      console.error("Error sending contact form:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-left mb-5 block group">
              <div className="text-white font-bold text-lg tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors">
                MEDIA & CRISIS
              </div>
              <div className="text-gray-600 text-[9px] tracking-wider mt-0.5">
                Antes parte de Efecto Estrategia Comunicaciones
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Ayudamos a organizaciones de infraestructura principal a gestionar
              y superar crisis complejas en entornos de alta exposición.
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
              Trabajamos con organizaciones de todos los sectores de
              infraestructura: energía, minería, transporte, puertos,
              construcción, saneamiento, telecomunicaciones y más.
            </p>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-[10px] text-gray-600 tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  {link.label} →
                </Link>
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
                <div
                  key={i}
                  className="flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors cursor-pointer"
                >
                  <Icon size={13} className="text-red-600 flex-shrink-0" />
                  {value}
                </div>
              ))}
            </div>

            {sent ? (
              <div className="border border-green-500/30 bg-green-500/5 p-4 text-center">
                <p className="text-green-400 text-xs tracking-wider">
                  ✓ MENSAJE ENVIADO
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    placeholder="Nombre"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                    required
                  />
                  <input
                    value={form.empresa}
                    onChange={(e) =>
                      setForm({ ...form, empresa: e.target.value })
                    }
                    placeholder="Empresa"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={form.correo}
                    onChange={(e) =>
                      setForm({ ...form, correo: e.target.value })
                    }
                    placeholder="Correo"
                    type="email"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                    required
                  />
                  <input
                    value={form.cargo}
                    onChange={(e) =>
                      setForm({ ...form, cargo: e.target.value })
                    }
                    placeholder="Cargo"
                    className="bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <textarea
                  value={form.mensaje}
                  onChange={(e) =>
                    setForm({ ...form, mensaje: e.target.value })
                  }
                  placeholder="Mensaje"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-red-600 text-white text-[10px] tracking-[0.2em] py-3 hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {sending ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} Media & Crisis. Todos los derechos
            reservados.
          </p>
          <p className="text-gray-700 text-xs">Lima, Perú</p>
        </div>
      </div>
    </footer>
  );
}
