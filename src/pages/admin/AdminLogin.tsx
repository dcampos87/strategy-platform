import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-white font-bold text-xl tracking-[0.2em] uppercase mb-2">
            MEDIA & CRISIS
          </div>
          <div className="text-gray-700 text-[10px] tracking-wider">
            Panel Administrativo
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="border border-red-500/30 bg-red-500/5 p-4 text-center">
              <p className="text-red-400 text-xs tracking-wider">{error}</p>
            </div>
          )}

          <div>
            <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mediacrisis.pe"
              className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-gray-600 text-[9px] tracking-[0.2em] block mb-2">
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white text-xs tracking-[0.2em] py-4 hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? "INGRESANDO..." : "INGRESAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
