import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ cart }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 text-white z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-red-600">
          A-FUEGO
        </h1>

        {/* Botón hamburguesa visible solo en móviles */}
        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú visible solo en pantallas grandes */}
        <ul className="hidden sm:flex gap-6 text-lg">
          <li><a href="#hero" className="hover:text-red-500">Inicio</a></li>
          <li><a href="#menu" className="hover:text-red-500">Menú</a></li>
          <li><a href="#about" className="hover:text-red-500">Nosotros</a></li>
          <li><a href="#contact" className="hover:text-red-500">Contacto</a></li>
          <li className="text-red-500 font-bold">
  🛒      ({cart.length})
        </li>
        </ul>
      </div>

 {/* Menú desplegable para móviles */}
{open && (
  <ul className="flex flex-col bg-black/95 sm:hidden text-center pb-4">
    
    <li>
      <a
        href="#hero"
        className="block py-2 hover:text-red-500"
        onClick={() => setOpen(false)}
      >
        Inicio
      </a>
    </li>

    <li>
      <a
        href="#menu"
        className="block py-2 hover:text-red-500"
        onClick={() => setOpen(false)}
      >
        Menú
      </a>
    </li>

    <li>
      <a
        href="#about"
        className="block py-2 hover:text-red-500"
        onClick={() => setOpen(false)}
      >
        Nosotros
      </a>
    </li>

    <li>
      <a
        href="#contact"
        className="block py-2 hover:text-red-500"
        onClick={() => setOpen(false)}
      >
        Contacto
      </a>
    </li>

    <li className="text-red-500 font-bold py-2">
      🛒 ({cart.length})
    </li>

  </ul>
)}
    </nav>
  );
}