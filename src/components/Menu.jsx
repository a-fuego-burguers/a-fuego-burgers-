export default function Menu() {
  const items = [
    { 
      name: "Suprema", 
      desc: "Pan artesanal, lechuga, carne angus, queso cheddar americano, queso crema, mermelada de tocineta, cebolla crispy, salsa de la casa, porción de papas.", 
      price: "20.000",
      img: "/img/suprema.png"
    },
    { 
      name: "Baccon", 
      desc: "Pan artesanal, lechuga, carne angus, queso cheddar americano, tocineta asada, queso mozzarella gratinado con maíz dulce, cebolla crispy, salsa de la casa, porción de papas.", 
      price: "20.000",
      img: "/img/baccon.png"
    },
    { 
      name: "Melada", 
      desc: "Pan artesanal, lechuga, carne angus, queso cheddar americano, queso campesino asado, maduro melado, salsa de la casa, porción de papas.", 
      price: "20.000",
      img: "/img/suprema.png"
    },
  ];

  return (
    <section id="menu" className="py-20 px-8 bg-neutral-900 text-center">
      <h2 className="text-4xl font-bold text-red-600 mb-10">Nuestro Menú</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="bg-black/80 p-6 rounded-2xl shadow-lg hover:shadow-red-700/30 transition duration-300 transform hover:-translate-y-2"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-xl transition-transform duration-500 hover:scale-110 hover:brightness-75"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-white">{item.name}</h3>
            <p className="text-gray-300 mb-4 text-justify">{item.desc}</p>
            <p className="text-red-500 font-bold text-lg">${item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}