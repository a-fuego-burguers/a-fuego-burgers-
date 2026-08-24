export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-neutral-900 text-center">
      {/* 🔴 Título */}
      <h2 className="text-3xl font-bold text-red-600 mb-6">Contáctanos</h2>

      {/* 📍 Información de contacto */}
      <p className="text-gray-300 mb-2">📍 Cl 6 # 8-63, Tesalia, Huila - Colombia</p>
      <p className="text-gray-300 mb-8">📞 +57 317 697 0123</p>

      {/* 🌐 Redes sociales */}
      <div className="flex justify-center gap-6 mb-10">
        <a
          href="https://www.instagram.com/a_fuego_burgers/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61589262105389"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          Facebook
        </a>
        <a
          href="http://wa.me/573176970123"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          WhatsApp
        </a>
      </div>

      {/* 🗺️ Mapa */}
      <div className="flex justify-center mb-10">
        <iframe
          title="Ubicación A Fuego Burgers"
          src="https://www.google.com/maps/embed?pb=!4v1768836356462!6m8!1m7!1szB0LULIT3c4WBwHJsP7KwA!2m2!1d2.486941522704431!2d-75.73055956350255!3f184.6623694648602!4f-2.3588162224660607!5f3.325193203789971"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="max-w-3xl w-full shadow-lg"
        ></iframe>
      </div>

      {/* ⚖️ Derechos reservados */}
      <p className="text-gray-500 text-sm">
        © 2025 A Fuego Burgers. Todos los derechos reservados.
      </p>
    </section>
  );
}