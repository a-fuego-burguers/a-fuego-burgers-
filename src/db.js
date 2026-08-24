import { openDB } from "idb";

export const dbPromise = openDB(
  "afuego-club",
  1,
  {
    upgrade(db) {

      if (
        !db.objectStoreNames.contains(
          "config"
        )
      ) {

        db.createObjectStore(
          "config"
        );

      }

    },
  }
);

export async function guardarToken(
  token
) {

  localStorage.setItem(
    "clienteToken",
    token
  );

  const db =
    await dbPromise;

  await db.put(
    "config",
    token,
    "clienteToken"
  );

}

export async function obtenerToken() {

  const local =
    localStorage.getItem(
      "clienteToken"
    );

  if (local) {

    return local;

  }

  const db =
    await dbPromise;

  return await db.get(
    "config",
    "clienteToken"
  );

}

export async function borrarToken() {

  localStorage.removeItem(
    "clienteToken"
  );

  const db =
    await dbPromise;

  await db.delete(
    "config",
    "clienteToken"
  );

}