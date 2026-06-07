import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

export default function Menu({ cart, setCart }) {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      try {

        const querySnapshot = await getDocs(
          collection(db, "products")
        );

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setItems(products);

      } catch (error) {

        console.log(error);
      }
    };

    getProducts();

  }, []);

  // 🍔 Hamburguesas
  const hamburguesas = items.filter(
    (item) => item.category === "hamburguesas"
  );

  // 🌭 Hot Dogs
  const hotdogs = items.filter(
    (item) => item.category === "hotdogs"
  );

  // 🥤 Bebidas
  const bebidas = items.filter(
    (item) => item.category === "bebidas"
  );

  return (

    <section id="menu" className="py-20 px-8 bg-neutral-900 text-center">

      <h2 className="text-4xl font-bold text-red-600 mb-10">
        Nuestro Menú
      </h2>

      {/* 🍔 Hamburguesas */}
      <h3 className="text-2xl font-bold text-white mb-6 mt-10">
        🍔 Hamburguesas
      </h3>

      <div className="grid md:grid-cols-3 gap-8">

        {hamburguesas.map((item, i) => (

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

            <h3 className="text-2xl font-semibold mb-2 text-white">
              {item.name}
            </h3>

            <p className="text-gray-300 mb-4 text-justify">
              {item.desc}
            </p>

            <p className="text-red-500 font-bold text-lg">
              ${item.price}
            </p>

            <button
              onClick={() => setCart([...cart, item])}
              className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold w-full"
            >
              Agregar al carrito 🛒
            </button>

          </div>

        ))}

      </div>

      {/* 🌭 Hot Dogs */}
      <h3 className="text-2xl font-bold text-white mb-6 mt-16">
        🌭 Hot Dogs
      </h3>

      <div className="grid md:grid-cols-3 gap-8">

        {hotdogs.map((item, i) => (

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

            <h3 className="text-2xl font-semibold mb-2 text-white">
              {item.name}
            </h3>

            <p className="text-gray-300 mb-4 text-justify">
              {item.desc}
            </p>

            <p className="text-red-500 font-bold text-lg">
              ${item.price}
            </p>

            <button
              onClick={() => setCart([...cart, item])}
              className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold w-full"
            >
              Agregar al carrito 🛒
            </button>

          </div>

        ))}

      </div>

      {/* 🥤 Bebidas */}
      <h3 className="text-2xl font-bold text-white mb-6 mt-16">
        🥤 Bebidas
      </h3>

      <div className="grid md:grid-cols-3 gap-8">

        {bebidas.map((item, i) => (

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

            <h3 className="text-2xl font-semibold mb-2 text-white">
              {item.name}
            </h3>

            <p className="text-gray-300 mb-4 text-justify">
              {item.desc}
            </p>

            <p className="text-red-500 font-bold text-lg">
              ${item.price}
            </p>

            <button
              onClick={() => setCart([...cart, item])}
              className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold w-full"
            >
              Agregar al carrito 🛒
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}
