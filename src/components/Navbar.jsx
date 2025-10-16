export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/90 fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-red-600">A-FUEGO</h1>
      <ul className="flex gap-6 text-lg">
        <li><a href="#hero" className="hover:text-red-500">Inicio</a></li>
        <li><a href="#menu" className="hover:text-red-500">Menú</a></li>
        <li><a href="#about" className="hover:text-red-500">Nosotros</a></li>
        <li><a href="#contact" className="hover:text-red-500">Contacto</a></li>
      </ul>
    </nav>
  );
}