import logo from "@/assets/efecto-logo.png";

const Index = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
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

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-6">
        {/* Logo with pulse ring */}
        <div className="relative mb-8 animate-fade-up">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="relative animate-float bg-card rounded-2xl p-4 sm:p-6 shadow-elegant">
            <img
              src={logo}
              alt="Efecto Estrategia Comunicaciones"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest uppercase mb-5 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          En desarrollo
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center mb-5 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Plataforma en <br />
          <span className="text-gradient">construcción</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-center text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up whitespace-pre-line px-4" style={{ animationDelay: "0.3s", opacity: 0 }}>
          Estamos construyendo el nuevo ecosistema digital de{"\n"}
          <span className="text-foreground font-semibold">Efecto Estrategia Comunicaciones.</span>{"\n"}
          Pronto disponible.
        </p>

        {/* Footer */}
        <footer className="absolute bottom-4 left-0 right-0 text-center text-xs sm:text-sm text-muted-foreground animate-fade-up px-4" style={{ animationDelay: "0.6s", opacity: 0 }}>
          © {new Date().getFullYear()} Efecto Estrategia Comunicaciones — Todos los derechos reservados
        </footer>
      </div>
    </main>
  );
};

export default Index;
