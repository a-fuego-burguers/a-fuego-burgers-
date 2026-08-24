import { useState } from "react";

export default function LoginCliente({
  onLogin
}) {

  const [telefono, setTelefono] =
    useState("");

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-zinc-900 border border-orange-500 rounded-3xl p-6 w-full max-w-md">

        <h1 className="text-orange-500 text-2xl font-bold text-center">
          🔥 A-Fuego Club
        </h1>

        <p className="text-white text-center mt-4">
          Ingresa tu número de teléfono
        </p>

        <input
          type="tel"
          value={telefono}
          onChange={(e) =>
            setTelefono(
              e.target.value
            )
          }
          placeholder="3151234567"
          className="w-full mt-4 p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
        />

        <button
          onClick={() =>
            onLogin(telefono)
          }
          className="w-full mt-4 bg-orange-500 text-black font-bold p-3 rounded-xl"
        >
          Continuar
        </button>

      </div>

    </div>

  );

}