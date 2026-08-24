import { getMessaging } from "firebase/messaging";

import { app } from "./firebase";

export const messaging =
  getMessaging(app);

export async function registrarSW() {

  return await navigator.serviceWorker.register(
    "/a-fuego-burgers-/firebase-messaging-sw.js"
  );

}