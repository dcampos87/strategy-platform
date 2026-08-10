import { useState, useEffect } from "react";
import { Mail, Phone, Building, Calendar } from "lucide-react";
import { supabase, getStoredSession, type ContactSubmission } from "@/lib/supabase";

export default function AdminContactos() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const session = getStoredSession();
  const token = session?.access_token;

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("contact_submissions", token)
        .select("*")
        .order("created_at", false)
        .then<ContactSubmission>();
      if (!error && data) setSubmissions(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-white text-2xl font-bold mb-8">Contactos</h1>
        <p className="text-gray-600 text-xs tracking-wider">CARGANDO...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Mensajes recibidos</h1>
          <p className="text-gray-600 text-xs tracking-wider">
            {submissions.length} mensajes de contacto
          </p>
        </div>
      </div>

      {selected && (
        <div className="border border-white/10 bg-[#0D0D0D] p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-sm font-bold tracking-[0.15em]">
              DETALLE DEL MENSAJE
            </h2>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-600 hover:text-white transition-colors text-xs tracking-wider"
            >
              CERRAR
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-[10px] tracking-[0.15em] w-20">NOMBRE:</span>
              <span className="text-white text-sm">{selected.nombre}</span>
            </div>
            {selected.empresa && (
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-[10px] tracking-[0.15em] w-20">EMPRESA:</span>
                <span className="text-white text-sm">{selected.empresa}</span>
              </div>
            )}
            {selected.cargo && (
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-[10px] tracking-[0.15em] w-20">CARGO:</span>
                <span className="text-white text-sm">{selected.cargo}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-[10px] tracking-[0.15em] w-20">CORREO:</span>
              <span className="text-red-400 text-sm">{selected.correo}</span>
            </div>
            {selected.mensaje && (
              <div>
                <span className="text-gray-600 text-[10px] tracking-[0.15em] block mb-2">MENSAJE:</span>
                <p className="text-gray-300 text-sm leading-relaxed border border-white/10 p-4">
                  {selected.mensaje}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-[10px] tracking-[0.15em] w-20">FECHA:</span>
              <span className="text-gray-500 text-xs">
                {new Date(selected.created_at).toLocaleString("es-PE")}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D0D0D]">
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Nombre</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Empresa</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Correo</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Cargo</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => setSelected(sub)}
                  className={`border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all ${
                    selected?.id === sub.id ? "bg-red-600/5" : ""
                  }`}
                >
                  <td className="text-white text-sm px-5 py-4 font-medium">{sub.nombre}</td>
                  <td className="text-gray-400 text-xs px-5 py-4">
                    {sub.empresa || "—"}
                  </td>
                  <td className="text-gray-400 text-xs px-5 py-4">{sub.correo}</td>
                  <td className="text-gray-500 text-xs px-5 py-4">
                    {sub.cargo || "—"}
                  </td>
                  <td className="text-gray-600 text-xs px-5 py-4">
                    {new Date(sub.created_at).toLocaleDateString("es-PE")}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-700 text-xs py-12 tracking-wider">
                    NO HAY MENSAJES
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
