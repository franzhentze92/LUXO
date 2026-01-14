import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1ed] pt-20">
      <div className="text-center px-4">
        <h1 className="font-serif text-8xl lg:text-9xl font-bold text-[#c9a961] mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#1a1a1a] mb-4">
          Página no encontrada
        </h2>
        <p className="text-[#6b6b6b] mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] font-medium rounded hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white font-medium rounded hover:bg-[#333] transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
