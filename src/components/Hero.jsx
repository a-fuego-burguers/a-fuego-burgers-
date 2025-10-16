export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black"
    >
      {/* 👇 Fondo animado tipo humo */}
      <div className="absolute inset-0 animate-fog"></div>

      {/* 👇 Contenido principal */}
      <div className="bg-black/60 p-8 rounded-xl relative z-10">
        <h1 className="text-5xl font-bold text-red-600 mb-4">A-FUEGO BURGERS</h1>
        <p className="text-xl max-w-xl">
          Hamburguesas artesanales al mejor estilo americano, hechas con carne 100% Angus 🔥
        </p>
        <a href="#menu">
          <button className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold">
            Ver Menú
          </button>
        </a>
      </div>
    </section>
  );
}