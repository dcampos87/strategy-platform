import logo from "@/assets/efecto-logo.png";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Logo with pulse ring */}
        <div className="relative mb-12 animate-fade-up">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="relative animate-float bg-card rounded-2xl p-6 shadow-elegant">
            <img
              src={logo}
              alt="Efecto Estrategia Comunicaciones"
              className="w-44 h-44 md:w-52 md:h-52 object-contain"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          En desarrollo
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-center mb-6 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Plataforma en <br />
          <span className="text-gradient">construcción</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-center text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          Estamos construyendo el nuevo ecosistema digital multisite de{" "}
          <span className="text-foreground font-semibold">Efecto Estrategia Comunicaciones</span>. Pronto disponible.
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-md mb-12 animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            <span>Progreso</span>
            <span>35%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[35%] rounded-full progress-shimmer" />
          </div>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          {[
            { label: "Diseño", status: "Completado", dot: "bg-primary" },
            { label: "Desarrollo", status: "En curso", dot: "bg-primary animate-pulse" },
            { label: "Lanzamiento", status: "Próximamente", dot: "bg-muted-foreground/40" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{item.label}</span>
              </div>
              <p className="text-foreground font-bold">{item.status}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          © {new Date().getFullYear()} Efecto Estrategia Comunicaciones — Todos los derechos reservados
        </footer>
      </div>
    </main>
  );
};

export default Index;
