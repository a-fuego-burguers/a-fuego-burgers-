export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black"
    >
      {/* 👇 Fondo animado tipo humo */}
      <div className="absolute inset-0 animate-fog"></div>

      {/* 👇 Contenido principal SIN fondo */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          A-FUEGO BURGERS
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-gray-200 drop-shadow-md">
          Hamburguesas artesanales al mejor estilo americano, hechas con carne 100% Angus 🔥
        </p>
        <button
  onClick={() => {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth"
    });
  }}
  className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold"
>
  Ver Menú
</button>
      </div>
    </section>
  );
}