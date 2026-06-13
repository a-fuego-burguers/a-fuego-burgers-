importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAQxrZq7z4M8k8wDiZb7BG_JaShdemlz-c",
  authDomain: "afuego-burgers.firebaseapp.com",
  projectId: "afuego-burgers",
  storageBucket: "afuego-burgers.firebasestorage.app",
  messagingSenderId: "200906227197",
  appId: "1:200906227197:web:85642c1e092841267e6d94"
});

const messaging =
  firebase.messaging();

//messaging.onBackgroundMessage(
  //(payload) => {

    //self.registration.showNotification(
      //payload.notification.title,
      //{
        //body:
          //payload.notification.body
      //}
    //);

  //}
//);