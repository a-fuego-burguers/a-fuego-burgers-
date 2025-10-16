export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-neutral-900 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-6">Contáctanos</h2>
      <p className="text-gray-300 mb-4">📍 Cra 9 # 5-29, Tesalia, Huila - Colombia</p>
      <p className="text-gray-300 mb-4">📞 +57 317 697 0123</p>
      <div className="flex justify-center gap-6 mt-6">
        <a 
           href="https://www.instagram.com/a_fuego_burguers/" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="hover:text-red-500"
        >
           Instagram
        </a>
         <a 
           href="https://www.instagram.com/a_fuego_burguers/" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="hover:text-red-500"
        >
           Facebook
        </a>
        <a 
           href="http://wa.me/573176970123" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="hover:text-red-500"
        >
           WhatsApp
        </a>
      </div>
      <p className="mt-10 text-gray-500 text-sm">© 2025 A Fuego Burgers. Todos los derechos reservados.</p>
    </section>
  );
}