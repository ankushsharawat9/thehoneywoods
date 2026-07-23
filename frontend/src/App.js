import { useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EditorialMarquee from "@/components/EditorialMarquee";
import Manifesto from "@/components/Manifesto";
import Rooms from "@/components/Rooms";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  const [prefillPackage, setPrefillPackage] = useState(null);

  const handleInquire = (pkgId) => {
    setPrefillPackage(pkgId);
    const el = document.getElementById("contact");
    if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -20, duration: 1.6 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <div className="grain" />
      <SmoothScroll />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--bg-dark)",
            color: "var(--bg-primary)",
            border: "1px solid var(--brand-mustard)",
            borderRadius: 0,
            fontFamily: "Manrope, sans-serif",
            fontSize: 13,
            letterSpacing: "0.05em",
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <EditorialMarquee />
        <Manifesto />
        <Rooms />
        <Packages onInquire={handleInquire} />
        <Gallery />
        <EditorialMarquee dark />
        <Reviews />
        <Contact prefillPackage={prefillPackage} setPrefillPackage={setPrefillPackage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
