import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-red-600 mb-4">
          404
        </h1>
        <p className="text-gray-400 text-lg mb-8 tracking-wider">
          Página no encontrada
        </p>
        <Link
          to="/"
          className="border border-white/30 text-white text-xs tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all inline-block"
        >
          VOLVER AL INICIO
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
