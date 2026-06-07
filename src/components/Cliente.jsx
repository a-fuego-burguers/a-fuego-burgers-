import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
collection,
query,
where,
getDocs
} from "firebase/firestore";

import { db } from "../firebase";

export default function Cliente() {

const { token } = useParams();

const [cliente, setCliente] = useState(null);

const comprasParaPremio = 4;

useEffect(() => {
cargarCliente();
}, []);

async function cargarCliente() {


const q = query(
  collection(db, "clientes"),
  where("token", "==", token)
);

const snapshot = await getDocs(q);

if (!snapshot.empty) {
  setCliente(snapshot.docs[0].data());
}


}

if (!cliente) {
return ( <div className="min-h-screen bg-black text-white flex items-center justify-center">
Cargando... </div>
);
}

return (

  <div className="min-h-screen bg-black flex justify-center items-start pt-10 px-4">


<div className="w-full max-w-lg">

  <div className="bg-zinc-900 border border-orange-500 rounded-3xl p-6 shadow-2xl">

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-orange-500 font-bold text-2xl">
          🔥 A-Fuego Club
        </h1>

        <p className="text-white text-lg mt-2">
          {cliente.nombre}
        </p>

      </div>

      <div className="text-right">

        <p className="text-orange-400 text-3xl font-bold">
          {cliente.compras}/{comprasParaPremio}
        </p>

      </div>

    </div>

    <div className="flex gap-3 mt-6">

      {[...Array(comprasParaPremio)].map((_, index) => (

        <div
          key={index}
          className={`
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            text-2xl
            ${
              index < cliente.compras
                ? "bg-orange-500"
                : "bg-zinc-700"
            }
          `}
        >
          🍔
        </div>

      ))}

    </div>

    <div className="mt-6">

      {cliente.compras >= comprasParaPremio ? (

        <p className="text-green-400 font-bold text-lg">
          🎉 Ya puedes reclamar tu hamburguesa gratis
        </p>

      ) : (

        <p className="text-white text-lg">

          Te faltan{" "}

          <span className="text-orange-400 font-bold">

            {comprasParaPremio - cliente.compras}

          </span>

          {" "}compras para tu premio

        </p>

      )}

    </div>

  </div>

</div>

  </div>
);


}
