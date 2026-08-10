import { useState, useEffect } from "react";
import { supabase, getStoredSession, type CredencialRequest } from "@/lib/supabase";

export default function AdminCredenciales() {
  const [requests, setRequests] = useState<CredencialRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const session = getStoredSession();
  const token = session?.access_token;

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("credencial_requests", token)
        .select("*")
        .order("created_at", false)
        .then<CredencialRequest>();
      if (!error && data) setRequests(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-white text-2xl font-bold mb-8">Solicitudes de Credenciales</h1>
        <p className="text-gray-600 text-xs tracking-wider">CARGANDO...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Solicitudes de credenciales</h1>
          <p className="text-gray-600 text-xs tracking-wider">
            {requests.length} personas han solicitado el PDF de credenciales
          </p>
        </div>
      </div>

      <div className="border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D0D0D]">
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">#</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Nombres</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Apellidos</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Correo</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Teléfono</th>
                <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr key={req.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                  <td className="text-gray-600 text-xs px-5 py-4">{i + 1}</td>
                  <td className="text-white text-sm px-5 py-4 font-medium">{req.nombres}</td>
                  <td className="text-white text-sm px-5 py-4">{req.apellidos}</td>
                  <td className="text-red-400 text-xs px-5 py-4">{req.correo}</td>
                  <td className="text-gray-400 text-xs px-5 py-4">{req.telefono}</td>
                  <td className="text-gray-600 text-xs px-5 py-4">
                    {new Date(req.created_at).toLocaleDateString("es-PE")}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-700 text-xs py-12 tracking-wider">
                    NO HAY SOLICITUDES
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
