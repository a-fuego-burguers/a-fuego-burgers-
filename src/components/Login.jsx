import { useState } from "react";

import { signInWithEmailAndPassword }
from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Bienvenido admin 🔥");

      navigate("/admin");

    } catch (error) {

      alert("Datos incorrectos 😢");

      console.log(error);
    }
  };

  return (

    <section className="min-h-screen bg-black flex items-center justify-center p-8">

      <div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-md flex flex-col gap-4">

        <h1 className="text-4xl text-red-600 font-bold text-center mb-4">
          Login Admin 🔥
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-xl bg-black text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-xl bg-black text-white"
        />

        <button
          onClick={login}
          className="bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold"
        >
          Ingresar 🔐
        </button>

      </div>

    </section>
  );
}