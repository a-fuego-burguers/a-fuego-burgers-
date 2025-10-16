import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Contact />
    </div>
  );
}

export default App;

