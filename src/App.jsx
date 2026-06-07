import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";
import Cart from "./components/Cart";

function App() {

  const [cart, setCart] = useState([]);

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