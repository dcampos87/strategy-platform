import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, FileText, MessageSquare, Download,
  LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: FileText, label: "Blog", path: "/admin/blog" },
  { icon: MessageSquare, label: "Contactos", path: "/admin/contactos" },
  { icon: Download, label: "Credenciales", path: "/admin/credenciales" },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A0A0A] border-r border-white/10 fixed inset-y-0 z-30">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="block">
            <div className="text-white font-bold text-sm tracking-[0.2em] uppercase hover:text-red-500 transition-colors">
              MEDIA & CRISIS
            </div>
            <div className="text-gray-700 text-[8px] tracking-wider mt-1">
              Panel Administrativo
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 text-xs tracking-[0.12em] font-medium transition-all ${
                  active
                    ? "bg-red-600/10 text-red-500 border-l-2 border-red-600"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-3 px-2">
            <p className="text-gray-500 text-[10px] truncate">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full text-[10px] tracking-[0.15em] text-gray-600 hover:text-red-500 transition-colors px-2 py-2"
          >
            <LogOut size={14} />
            CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/98 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-white font-bold text-xs tracking-[0.2em]">
            MEDIA & CRISIS · ADMIN
          </span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black pb-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-xs tracking-[0.12em] font-medium transition-all ${
                    active ? "text-red-500 bg-red-600/5" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => { signOut(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-6 py-3 text-xs tracking-[0.12em] text-gray-600 hover:text-red-500 w-full text-left"
            >
              <LogOut size={16} />
              CERRAR SESIÓN
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
