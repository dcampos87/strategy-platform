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
  nombre: string;
  empresa?: string;
  correo: string;
  cargo?: string;
  mensaje?: string;
}

export interface CredencialRequest {
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
}

// ─── Tiny Supabase REST client (zero dependencies) ────────────────────────────

type FilterValue = string | number | boolean | null;

async function restFetch<T>(
  method: "GET" | "POST",
  path: string,
  queryParts: string[] = [],
  body?: unknown
): Promise<{ data: T[] | null; error: string | null }> {
  const url = `${SUPABASE_URL}/rest/v1/${path}?${queryParts.join("&")}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };

  const options: RequestInit = { method, headers };

  if (method === "POST" && body) {
    headers["Content-Type"] = "application/json";
    headers["Prefer"] = "return=representation";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) return { data: null, error: res.statusText };
  const data = await res.json();
  return { data: Array.isArray(data) ? data : [data].filter(Boolean), error: null };
}

function query(path: string) {
  const parts: string[] = [];
  return {
    select: (columns = "*") => {
      parts.push(`select=${encodeURIComponent(columns)}`);
      return {
        order: (column: string, asc: boolean) => {
          parts.push(`order=${column}.${asc ? "asc" : "desc"}`);
          return {
            then: <T>() => restFetch<T>("GET", path, parts),
          };
        },
        then: <T>() => restFetch<T>("GET", path, parts),
      };
    },
    insert: <T>(body: unknown) => restFetch<T>("POST", path, parts, body),
  };
}

export const supabase = {
  from: (table: string) => query(table),
};
