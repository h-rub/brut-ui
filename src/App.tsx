import { TopBar } from "./components/TopBar";
import { NavBar } from "./components/NavBar";
import { Hero } from "./sections/Hero";
import { Pillars } from "./sections/Pillars";
import { Tokens } from "./sections/Tokens";
import { Components } from "./sections/Components";
import { Voice } from "./sections/Voice";
import { Principles } from "./sections/Principles";
import { Footer } from "./sections/Footer";

export function App() {
  return (
    <div className="min-h-screen text-ink">
      <TopBar />
      <NavBar />
      <main>
        <Hero />
        <Pillars />
        <Tokens />
        <Components />
        <Voice />
        <Principles />
      </main>
      <Footer />
    </div>
  );
}
