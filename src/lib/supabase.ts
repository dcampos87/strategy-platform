import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mjbcgfcswadhmqjlkysg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYmNnZmNzd2FkaG1xamxreXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMzI0MzgsImV4cCI6MjEwMTcwODQzOH0.8W0BTUo08LDGi3xl6Yy89XAojckHkf_GvBtYNSXhT-s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
