import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  type AuthSession,
  signIn as apiSignIn,
  signOut as apiSignOut,
  getUser,
  getStoredSession,
  storeSession,
  clearSession,
} from "@/lib/supabase";

interface AuthContextType {
  session: AuthSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      getUser(stored.access_token).then(({ user, error }) => {
        if (user && !error) {
          setSession(stored);
        } else {
          clearSession();
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const { session: s, error } = await apiSignIn(email, password);
    if (s) {
      storeSession(s);
      setSession(s);
      return { error: null };
    }
    return { error };
  };

  const handleSignOut = async () => {
    if (session) {
      await apiSignOut(session.access_token);
    }
    clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
