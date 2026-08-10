const SUPABASE_URL = "https://mjbcgfcswadhmqjlkysg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYmNnZmNzd2FkaG1xamxreXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMzI0MzgsImV4cCI6MjEwMTcwODQzOH0.8W0BTUo08LDGi3xl6Yy89XAojckHkf_GvBtYNSXhT-s";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  featured: boolean;
  published_at: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: number;
  nombre: string;
  empresa: string | null;
  correo: string;
  cargo: string | null;
  mensaje: string | null;
  created_at: string;
}

export interface CredencialRequest {
  id: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  created_at: string;
}

// ─── REST helpers ─────────────────────────────────────────────────────────────

type FilterValue = string | number | boolean | null;

async function restFetch<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  queryParts: string[] = [],
  body?: unknown,
  token?: string
): Promise<{ data: T[] | null; error: string | null }> {
  const url = `${SUPABASE_URL}/rest/v1/${path}?${queryParts.join("&")}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
  };

  if (method !== "GET" && body) {
    headers["Content-Type"] = "application/json";
    if (method === "POST") headers["Prefer"] = "return=representation";
  }

  const options: RequestInit = { method, headers };
  if (method !== "GET" && body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  if (!res.ok) return { data: null, error: res.statusText };
  const data = await res.json();
  return { data: Array.isArray(data) ? data : [data].filter(Boolean), error: null };
}

function query(path: string, token?: string) {
  const parts: string[] = [];
  const methods = {
    select: (columns = "*") => {
      parts.push(`select=${encodeURIComponent(columns)}`);
      return {
        order: (column: string, asc: boolean) => {
          parts.push(`order=${column}.${asc ? "asc" : "desc"}`);
          return { then: <T>() => restFetch<T>("GET", path, parts, undefined, token) };
        },
        eq: (column: string, value: FilterValue) => {
          parts.push(`${column}=eq.${value}`);
          return { then: <T>() => restFetch<T>("GET", path, parts, undefined, token) };
        },
        then: <T>() => restFetch<T>("GET", path, parts, undefined, token),
      };
    },
    insert: <T>(body: unknown) =>
      restFetch<T>("POST", path, parts, body, token),
    update: <T>(body: unknown) =>
      restFetch<T>("PATCH", path, parts, body, token),
    eq: (column: string, value: FilterValue) => {
      parts.push(`${column}=eq.${value}`);
      return {
        delete: <T>() => restFetch<T>("DELETE", path, parts, undefined, token),
        then: <T>() => restFetch<T>("GET", path, parts, undefined, token),
        update: <T>(body: unknown) =>
          restFetch<T>("PATCH", path, parts, body, token),
      };
    },
  };
  return methods;
}

export const supabase = {
  from: (table: string, token?: string) => query(table, token),
};

// ─── Auth (GoTrue API) ────────────────────────────────────────────────────────

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email: string };
}

export async function signIn(
  email: string,
  password: string
): Promise<{ session: AuthSession | null; error: string | null }> {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    return { session: null, error: err.error_description || err.msg || "Error de autenticación" };
  }
  const data = await res.json();
  const session: AuthSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
    user: data.user,
  };
  return { session, error: null };
}

export async function getUser(
  token: string
): Promise<{ user: { id: string; email: string } | null; error: string | null }> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return { user: null, error: res.statusText };
  const data = await res.json();
  return { user: data, error: null };
}

export async function signOut(token: string): Promise<void> {
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
}

// ─── Session storage helpers ──────────────────────────────────────────────────

const SESSION_KEY = "mc_admin_session";

export function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expires_at) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
