import { useState } from "react";

export default function Cart({ cart, setCart }) {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price.replace(".", ""));
  }, 0);

  const removeItem = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);
  };

  const products = cart.map(
    (item) => `🍔 ${item.name} - $${item.price}`
  ).join("%0A");

  const whatsappLink =
    `https://wa.me/573176970123?text=` +
    `🔥 NUEVO PEDIDO A-FUEGO BURGERS 🔥%0A%0A` +
    `👤 Nombre: ${name}%0A` +
    `📍 Dirección: ${address}%0A` +
    `📝 Observaciones: ${notes}%0A%0A` +
    `${products}%0A%0A` +
    `💰 Total: $${total}`;

  return (
    <>
      
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 w-16 h-16 rounded-full text-2xl shadow-lg"
      >
<div className="relative flex items-center justify-center">

  <span className="text-2xl">
    🛒
  </span>

  {cart.length > 0 && (
    <span className="absolute -top-3 -right-3 bg-white text-red-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
      {cart.length}
    </span>
  )}

</div>

      </button>

      {/* PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-black shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-red-600">
              Tu Pedido
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-2xl"
            >
              ✖
            </button>

          </div>

          {cart.length === 0 ? (

            <p className="text-gray-400">
              Tu carrito está vacío 😢
            </p>

          ) : (

            <>
              <div className="flex flex-col gap-4">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center"
                  >

                    <div>
                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p className="text-red-500">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                    >
                      ❌
                    </button>

                  </div>

                ))}

              </div>

              <div className="mt-8 flex flex-col gap-4">

                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-4 rounded-xl bg-neutral-900 border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-4 rounded-xl bg-neutral-900 border border-gray-700"
                />

                <textarea
                  placeholder="Observaciones"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="p-4 rounded-xl bg-neutral-900 border border-gray-700"
                />

                <h3 className="text-2xl font-bold text-right">
                  Total: ${total}
                </h3>

            <button
  onClick={() => {

    if (cart.length === 0) {
      alert("Agrega productos al carrito 🍔");
      return;
    }

    if (!name.trim()) {
      alert("Por favor ingresa tu nombre 👤");
      return;
    }

    if (!address.trim()) {
      alert("Por favor ingresa tu dirección 📍");
      return;
    }

    window.open(whatsappLink, "_blank");
    setCart([]);
    setName("");
    setAddress("");
    setNotes("");
  }}
  className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold"
>
  Enviar pedido 📲
            </button>

              </div>
            </>
          )}

        </div>

      </div>
    </>
  );
}