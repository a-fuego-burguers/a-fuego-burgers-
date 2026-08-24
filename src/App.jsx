import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";
import Cart from "./components/Cart";
import { obtenerToken } from "./db";

function App() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

useEffect(() => {

  async function cargar() {

    const tokenGuardado =
      await obtenerToken();
      console.log(
  "TOKEN LEIDO:",
  tokenGuardado
);

    if (tokenGuardado) {

      navigate(
        `/cliente/${tokenGuardado}`
      );

    }

  }

  cargar();

}, []);

  return (

    <div className="bg-black text-white">

      <Navbar cart={cart} />

      <Hero />

      <Menu
        cart={cart}
        setCart={setCart}
      />

      <About />

      <Reviews />

      <AddReview />

      <Contact />

      <WhatsAppButton />

      <Cart
        cart={cart}
        setCart={setCart}
      />

    </div>
  );
}

export default App;