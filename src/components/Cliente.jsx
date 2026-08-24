import { useEffect, useState } from "react";

import {
 collection,
 updateDoc,
 query,
 where,
 getDocs,
 doc,
 getDoc,
 onSnapshot
} from "firebase/firestore";

import { getToken }
from "firebase/messaging";

import {
  messaging
}
from "../firebase-messaging";

import { db } from "../firebase";

import LoginCliente from "./LoginCliente";



export default function Cliente() {

const [cliente, setCliente] =
useState(null);
const [notificaciones,
  setNotificaciones] =
  useState([]);

const [mostrarNotificaciones,
  setMostrarNotificaciones] =
  useState(false);
const [cargando, setCargando] =
useState(true);

const [installPrompt, setInstallPrompt] =
useState(null);

const [instalada, setInstalada] =
useState(false);

const [comprasParaPremio,
  setComprasParaPremio] =
  useState(4);

  async function cargarConfiguracion() {

  try {

    const snap =
      await getDoc(
        doc(
          db,
          "configuracion",
          "fidelizacion"
        )
      );

    if (snap.exists()) {

      setComprasParaPremio(
        snap.data()
          .comprasParaPremio || 4
      );

    }

  } catch (error) {

    console.error(error);

  }

}

useEffect(() => {

  async function iniciar() {

    await cargarConfiguracion();

    setCargando(false);

  }

  iniciar();

}, []);

useEffect(() => {


const handler = (e) => {

  e.preventDefault();

  setInstallPrompt(e);

};

const appInstalada = () => {

  setInstalada(true);

  setInstallPrompt(null);

};

window.addEventListener(
  "beforeinstallprompt",
  handler
);

window.addEventListener(
  "appinstalled",
  appInstalada
);

return () => {

  window.removeEventListener(
    "beforeinstallprompt",
    handler
  );

  window.removeEventListener(
    "appinstalled",
    appInstalada
  );

};


}, []);

async function buscarCliente(
telefono
) {

await cargarConfiguracion();

setCargando(true);

try {

  const q = query(
    collection(
      db,
      "clientes"
    ),
    where(
      "telefono",
      "==",
      telefono
    )
  );

  const snapshot =
    await getDocs(q);

  if (!snapshot.empty) {

    const datos =
      snapshot.docs[0].data();

    setCliente(datos);
await cargarNotificaciones(
  telefono
);
    localStorage.setItem(
      "telefonoCliente",
      telefono
    );
    await registrarNotificaciones(
      
  telefono
      );

  } else {

    alert(
      "No existe ningún cliente con ese número."
    );

  }

} catch (error) {

  console.error(error);

} finally {

  setCargando(false);

}


}

async function cargarNotificaciones(
  telefono
) {

  const q = query(
    collection(
      db,
      "notificaciones_clientes"
    ),
    where(
      "telefono",
      "==",
      telefono
    )
  );

  onSnapshot(
    q,
    (snapshot) => {

      const lista = [];

      snapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          ...doc.data()
        });

      });

      lista.sort(
        (a, b) =>
          b.fecha?.seconds -
          a.fecha?.seconds
      );

      setNotificaciones(
        lista
      );

    }
  );

}

async function instalarApp() {


if (!installPrompt) return;

installPrompt.prompt();

const result =
  await installPrompt.userChoice;

if (
  result.outcome ===
  "accepted"
) {

  setInstallPrompt(null);

}


}

function cerrarSesion() {

  localStorage.removeItem(
    "telefonoCliente"
  );

  setCliente(null);

  setNotificaciones([]);

  setMostrarNotificaciones(false);

}

async function registrarNotificaciones(
  telefono
) {

  try {

    const permiso =
      await Notification.requestPermission();

    if (
      permiso !== "granted"
    ) {
      return;
    }

    const registration =
      await navigator.serviceWorker.register(
        "/a-fuego-burgers-/firebase-messaging-sw.js"
      );

    const tokenFCM =
      await getToken(
        messaging,
        {
          vapidKey:
            "BI-pkcpzHUprCXXOBJqxnJVxFJqkV0S3pZsnYcf5YH_k0n6FFbnSSbXCplNQThprks4osGlKsVFhlyb6G0JmmO4",
          serviceWorkerRegistration:
            registration
        }
      );
      console.log(
  "TOKEN ACTUAL:",
  tokenFCM
);

    if (!tokenFCM) {

      console.log(
        "No se obtuvo token FCM"
      );

      return;

    }

    const q = query(
      collection(
        db,
        "clientes"
      ),
      where(
        "telefono",
        "==",
        telefono
      )
    );

    const snapshot =
      await getDocs(q);

    if (
      !snapshot.empty
    ) {

      const clienteDoc =
        snapshot.docs[0];

      await updateDoc(
        doc(
          db,
          "clientes",
          clienteDoc.id
        ),
        {
          fcmToken:
            tokenFCM
        }
      );

      console.log(
        "FCM guardado"
      );

    }

  } catch (error) {

    console.error(
      error
    );

  }

}


if (cargando) {


return (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    Cargando tarjeta...
  </div>
);


}

if (!cliente) {

return (
  <LoginCliente
    onLogin={
      buscarCliente
    }
  />
);


}

return (


<div className="min-h-screen bg-black flex justify-center items-start pt-10 px-4">

  <div className="w-full max-w-lg">

     {/* Campanita arriba */}
    <div className="flex justify-end mb-4">

      <button
        onClick={() =>
          setMostrarNotificaciones(
            !mostrarNotificaciones
          )
        }
        className="relative text-3xl"
      >
        🔔

        {notificaciones.length > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              rounded-full
              w-5
              h-5
              flex
              items-center
              justify-center
            "
          >
            {notificaciones.length}
          </span>
        )}

      </button>

    </div>

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

      <div className="flex flex-wrap gap-3 mt-6 justify-center">

        {[...Array(comprasParaPremio)].map(
          (_, index) => (

            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                index < cliente.compras
                  ? "bg-orange-500"
                  : "bg-zinc-700"
              }`}
            >
              🍔
            </div>

          )
        )}

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
      
{mostrarNotificaciones && (

<div className="mt-4 bg-zinc-800 rounded-xl p-4">

  <h3 className="text-orange-400 font-bold mb-3">
    Notificaciones
  </h3>

  {
    notificaciones.length === 0
    ? (
      <p className="text-gray-400">
        No tienes notificaciones
      </p>
    )
    : (
      notificaciones.map(
        (n) => (

          <div
            key={n.id}
            className="border-b border-zinc-700 py-3"
          >

            <p className="font-bold text-white">
              {n.titulo}
            </p>

           <p className="text-gray-300 text-sm">
  {n.mensaje}
</p>

<p className="text-gray-500 text-xs mt-1">
  {
    n.fecha?.seconds
      ? new Date(
          n.fecha.seconds * 1000
        ).toLocaleDateString()
      : ""
  }
</p>

          </div>

        )
      )
    )
  }

</div>

)
}

      {!instalada &&
        installPrompt && (

        <button
          onClick={instalarApp}
          className="mt-4 w-full bg-gradient-to-r from-orange-500/20 to-orange-700/20 border border-orange-500 rounded-xl p-3 text-center"
        >

          <p className="font-bold text-orange-400">
            📲 Instala A-Fuego Club
          </p>

          <p className="text-sm text-gray-300 mt-1">
            Accede más rápido a tu tarjeta.
          </p>

        </button>

      )}

      <button
        onClick={
          cerrarSesion
        }
        className="mt-4 w-full text-zinc-400 text-sm hover:text-orange-400"
      >
        🔄 Cambiar cliente
      </button>

    </div>

  </div>

</div>


);

}
