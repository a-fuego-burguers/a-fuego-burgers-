import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddReview() {

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);

  // 🔥 Normalizar texto
  const normalize = (text) => {

    return text
      .toLowerCase()
      .replace(/[@4]/g, "a")
      .replace(/[3]/g, "e")
      .replace(/[1]/g, "i")
      .replace(/[0]/g, "o")
      .replace(/[$5]/g, "s")
      .replace(/[^a-zA-Z]/g, "");
  };

  // 🔥 Palabras bloqueadas
  const badWords = [

    /puta/i,
    /puto/i,
    /mierda/i,
    /gonorrea/i,
    /gono/i,
    /hijueputa/i,
    /hpta/i,
    /malparido/i,
    /marica/i,
    /pirobo/i,
    /idiota/i,
    /imbecil/i,
    /estupido/i,
    /tetrahijueputa/i,
    /hijodeperra/i,
    /hijodelastresmilputas/i,
    /chiche/i,
    /culo/i,
    /vagina/i,
    /cuca/i,
    /kuka/i,
    /ratas/i,
    /basura/i,
    /\bhp\b/i,
    /\bmk\b/i

  ];

  const handleSubmit = async (e) => {

    e.preventDefault();

    // 🔥 Validar groserías
    const normalizedText = normalize(text);

    const hasBadWords = badWords.some((regex) =>
      regex.test(normalizedText)
    );

    if (hasBadWords) {

      alert("Tu comentario contiene palabras no permitidas 🚫");

      return;
    }

    try {

      await addDoc(collection(db, "reviews"), {
        name,
        text,
        stars,
      });

      alert("Reseña enviada 🔥");

      setName("");
      setText("");
      setStars(5);

    } catch (error) {

      console.error(error);

      alert("Error al enviar reseña");
    }
  };

  return (

    <section className="py-20 px-8 bg-neutral-900 text-center">

      <h2 className="text-4xl font-bold text-red-600 mb-10">
        Deja tu opinión ⭐
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 rounded-xl bg-black text-white border border-gray-700"
          required
        />

        <textarea
          placeholder="Escribe tu opinión..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-4 rounded-xl bg-black text-white border border-gray-700"
          rows="4"
          required
        />

        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          className="p-4 rounded-xl bg-black text-white border border-gray-700"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition p-4 rounded-xl font-bold"
        >
          Enviar reseña 🔥
        </button>

      </form>

    </section>
  );
}