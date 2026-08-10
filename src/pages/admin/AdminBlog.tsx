import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Save, Eye } from "lucide-react";
import { supabase, getStoredSession, type BlogPost } from "@/lib/supabase";

const CATEGORIES = [
  "INFRAESTRUCTURA",
  "GESTIÓN DE CRISIS",
  "RIESGO REPUTACIONAL",
  "ASUNTOS PÚBLICOS",
  "MANEJO DE CRISIS",
];

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "INFRAESTRUCTURA",
  image_url: "",
  featured: false,
  published_at: new Date().toISOString().slice(0, 10),
};

type PostForm = typeof emptyPost & { id?: number };

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PostForm | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const session = getStoredSession();
  const token = session?.access_token;

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts", token)
      .select("*")
      .order("published_at", false)
      .then<BlogPost>();
    if (!error && data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const msg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleCreate = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("blog_posts", token)
      .insert<BlogPost>({
        title: editing.title,
        slug: editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        excerpt: editing.excerpt || null,
        content: editing.content || null,
        category: editing.category,
        image_url: editing.image_url || null,
        featured: editing.featured,
        published_at: editing.published_at,
      });
    if (error) {
      msg("error", error);
    } else {
      msg("success", "Artículo creado");
      setCreating(false);
      setEditing(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editing || !editing.id) return;
    setSaving(true);
    const { error } = await supabase
      .from("blog_posts", token)
      .eq("id", editing.id)
      .update<BlogPost>({
        title: editing.title,
        slug: editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        excerpt: editing.excerpt || null,
        content: editing.content || null,
        category: editing.category,
        image_url: editing.image_url || null,
        featured: editing.featured,
        published_at: editing.published_at,
      });
    if (error) {
      msg("error", error);
    } else {
      msg("success", "Artículo actualizado");
      setEditing(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    const { error } = await supabase
      .from("blog_posts", token)
      .eq("id", id)
      .delete();
    if (error) {
      msg("error", "Error al eliminar");
    } else {
      msg("success", "Artículo eliminado");
      fetchPosts();
    }
    setDeleting(null);
  };

  const startEdit = (post: BlogPost) => {
    setCreating(false);
    setEditing({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      category: post.category,
      image_url: post.image_url || "",
      featured: post.featured,
      published_at: post.published_at || "",
    });
  };

  const startCreate = () => {
    setEditing(null);
    setCreating(true);
    setEditing(emptyPost);
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3 placeholder-gray-700 focus:outline-none focus:border-red-600 transition-colors";
  const labelClass = "text-gray-600 text-[9px] tracking-[0.2em] block mb-2";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Blog</h1>
          <p className="text-gray-600 text-xs tracking-wider">
            {posts.length} artículos publicados
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 bg-red-600 text-white text-xs tracking-[0.15em] px-5 py-3 hover:bg-red-700 transition-colors"
        >
          <Plus size={14} />
          NUEVO
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 text-center text-xs tracking-wider ${
            message.type === "success"
              ? "border border-green-500/30 bg-green-500/5 text-green-400"
              : "border border-red-500/30 bg-red-500/5 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Editor form */}
      {(editing !== null) && (
        <div className="border border-white/10 bg-[#0D0D0D] p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-sm font-bold tracking-[0.15em]">
              {creating ? "NUEVO ARTÍCULO" : "EDITAR ARTÍCULO"}
            </h2>
            <button
              onClick={() => { setEditing(null); setCreating(false); }}
              className="text-gray-600 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>TÍTULO *</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Título del artículo"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>CATEGORÍA</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>EXTRACTO</label>
              <textarea
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="Resumen corto del artículo"
              />
            </div>

            <div>
              <label className={labelClass}>CONTENIDO</label>
              <textarea
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Cuerpo completo del artículo (HTML o texto)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>IMAGEN URL</label>
                <input
                  value={editing.image_url}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>FECHA PUBLICACIÓN</label>
                <input
                  type="date"
                  value={editing.published_at}
                  onChange={(e) => setEditing({ ...editing, published_at: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="text-gray-400 text-xs tracking-[0.15em]">
                    DESTACADO
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={creating ? handleCreate : handleUpdate}
                disabled={saving || !editing.title.trim()}
                className="flex items-center gap-2 bg-red-600 text-white text-xs tracking-[0.15em] px-6 py-3 hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "GUARDANDO..." : creating ? "CREAR" : "GUARDAR CAMBIOS"}
              </button>
              <button
                onClick={() => { setEditing(null); setCreating(false); }}
                className="text-gray-600 text-xs tracking-[0.15em] px-6 py-3 hover:text-white transition-colors"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts table */}
      {loading ? (
        <p className="text-gray-600 text-xs tracking-wider">CARGANDO...</p>
      ) : (
        <div className="border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-[#0D0D0D]">
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4 w-12">#</th>
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Título</th>
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Categoría</th>
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Fecha</th>
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4">Destacado</th>
                  <th className="text-gray-600 text-[9px] tracking-[0.2em] px-5 py-4 w-24">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-all ${
                      editing?.id === post.id ? "bg-red-600/5" : ""
                    }`}
                  >
                    <td className="text-gray-600 text-xs px-5 py-4">{i + 1}</td>
                    <td className="text-white text-sm px-5 py-4 font-medium">
                      {post.title}
                      <p className="text-gray-600 text-[10px] mt-0.5 truncate max-w-xs">
                        {post.excerpt}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-red-500 text-[9px] tracking-[0.15em] font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="text-gray-500 text-xs px-5 py-4">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("es-PE")
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      {post.featured ? (
                        <span className="text-green-500 text-[10px]">★</span>
                      ) : (
                        <span className="text-gray-700 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(post)}
                          className="text-gray-500 hover:text-white transition-colors p-1"
                          title="Editar"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting === post.id}
                          className="text-gray-600 hover:text-red-500 transition-colors p-1 disabled:opacity-30"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-700 text-xs py-12 tracking-wider">
                      NO HAY ARTÍCULOS
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
