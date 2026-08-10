import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, MessageSquare, Download, Users } from "lucide-react";
import { supabase, getStoredSession } from "@/lib/supabase";

async function getCount(table: string): Promise<number> {
  const session = getStoredSession();
  const { data, error } = await supabase
    .from(table, session?.access_token)
    .select("id")
    .then<{ id: number }>();
  if (error || !data) return 0;
  return data.length;
}

const statsCards = [
  { key: "blog", label: "Posts de Blog", icon: FileText, table: "blog_posts", color: "text-red-500" },
  { key: "contacts", label: "Mensajes", icon: MessageSquare, table: "contact_submissions", color: "text-blue-500" },
  { key: "credencials", label: "Solicitudes PDF", icon: Download, table: "credencial_requests", color: "text-green-500" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(
        statsCards.map(async (card) => {
          const count = await getCount(card.table);
          return { key: card.key, count };
        })
      );
      const map: Record<string, number> = {};
      results.forEach((r) => (map[r.key] = r.count));
      setCounts(map);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-white text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600 text-xs tracking-wider">
          Vista general del contenido del sitio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              to={`/admin/${card.key === "blog" ? "blog" : card.key === "contacts" ? "contactos" : "credenciales"}`}
              className="border border-white/10 bg-[#0D0D0D] p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={22} className={card.color} />
                {loading ? (
                  <span className="w-8 h-5 bg-white/5 animate-pulse" />
                ) : (
                  <span className="text-white text-2xl font-display font-bold">
                    {counts[card.key] ?? 0}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs tracking-[0.12em] group-hover:text-white transition-colors">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="border border-white/10 bg-[#0D0D0D] p-6">
        <p className="text-gray-600 text-[10px] tracking-[0.2em] mb-5">
          ACCESOS RÁPIDOS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Nuevo artículo de blog", path: "/admin/blog" },
            { label: "Ver mensajes recibidos", path: "/admin/contactos" },
            { label: "Ver solicitudes de credenciales", path: "/admin/credenciales" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-400 text-xs tracking-[0.1em] border border-white/10 px-5 py-3 hover:border-red-600 hover:text-red-500 transition-all"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
