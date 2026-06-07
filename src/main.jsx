import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Cliente from "./components/Cliente";

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import App from "./App";
import AdminPanel from "./components/AdminPanel";

import "./index.css";
function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);
      }
    );

    return () => unsubscribe();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return user ? children : <Login />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <HashRouter>
      <Routes>

        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/cliente/:token"
          element={<Cliente />}
        />
      <Route
      path="/admin"
      element={
      <ProtectedRoute>
      <AdminPanel />
      </ProtectedRoute>
      }
      />
        <Route
        path="/login"
        element={<Login />}
/>
      </Routes>

    </HashRouter>

  </React.StrictMode>
);
