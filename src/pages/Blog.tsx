import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase, type BlogPost } from "@/lib/supabase";

const BLOG_CATEGORIES = [
  "TODOS",
  "INFRAESTRUCTURA",
  "GESTIÓN DE CRISIS",
  "RIESGO REPUTACIONAL",
  "ASUNTOS PÚBLICOS",
  "MANEJO DE CRISIS",
];
const PAGE_SIZE = 6;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setPosts(data as BlogPost[]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const filtered =
    activeCategory === "TODOS"
      ? posts
      : posts.filter((p) => p.category === activeCategory);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisible(PAGE_SIZE);
  };

  if (loading) {
    return (
      <div className="bg-white pt-24 min-h-screen flex items-center justify-center">
        <p className="text-gray-400 tracking-widest text-sm">CARGANDO...</p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24">
      {/* HERO EDITORIAL */}
      <section className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <SectionLabel>BLOG</SectionLabel>
              <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-tight">
                Ideas para anticipar lo que viene
              </h1>
            </div>
            <div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Análisis, perspectivas y herramientas para organizaciones que
                operan en entornos de alta exposición reputacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LO ÚLTIMO (tarjetas horizontales) */}
      {featured.length > 0 && (
        <section className="bg-black border-b border-white/10 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-gray-600 text-[9px] tracking-[0.35em] uppercase pb-6 border-b border-white/10 mb-0">
              LO ÚLTIMO
            </p>
            <div className="divide-y divide-white/10">
              {featured.map((post) => (
                <article
                  key={post.id}
                  className="group cursor-pointer py-8 grid grid-cols-1 md:grid-cols-5 gap-6 hover:bg-white/[0.02] transition-all -mx-4 px-4"
                >
                  <div className="md:col-span-2 overflow-hidden bg-gray-900 flex-shrink-0">
                    <img
                      src={post.image_url || ""}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      style={{ minHeight: "160px" }}
                    />
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center gap-3">
                    <p className="text-red-600 text-[9px] font-bold tracking-[0.3em]">
                      {post.category}
                    </p>
                    <h2 className="text-white font-bold text-xl lg:text-2xl leading-snug group-hover:text-red-100 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-auto">
                      <span className="text-gray-600 text-xs tracking-wider">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString(
                              "es-PE",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                          : ""}
                      </span>
                      <span className="text-red-600 text-xs tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        LEER <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FILTROS + GRILLA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="flex gap-2 flex-wrap mb-12 pb-8 border-b border-gray-100">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[10px] tracking-[0.15em] px-5 py-2 transition-all font-medium ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {shown.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="overflow-hidden bg-gray-100 mb-5">
                <img
                  src={post.image_url || ""}
                  alt={post.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-red-600 text-[9px] font-bold tracking-[0.3em] mb-2">
                {post.category}
              </p>
              <h3 className="text-black font-bold text-lg leading-snug mb-3 group-hover:text-red-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-gray-400 text-xs">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                      })
                    : ""}
                </span>
                <ArrowRight
                  size={14}
                  className="text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
                />
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="border border-black text-black text-xs tracking-[0.2em] px-12 py-4 hover:bg-black hover:text-white transition-all"
            >
              VER MÁS
            </button>
          </div>
        )}

        {shown.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-sm tracking-wider">
              No hay artículos en esta categoría.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
