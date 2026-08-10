import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500 tracking-widest text-sm">VERIFICANDO...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
