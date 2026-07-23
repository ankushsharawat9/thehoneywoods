import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1618500508371-d0158e696eb0?crop=entropy&cs=srgb&fm=jpg&q=85";

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.1, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 180]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.35, 0.6]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm} IST`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" data-testid="hero-section" className="relative w-full" style={{ height: "100vh", minHeight: 720, overflow: "hidden" }}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={HERO_IMG}
          alt="Snow-capped Himalayan mountains, Manali"
          className="hero-img absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div className="absolute inset-0" style={{ background: "#121212", opacity: overlayOpacity }} />

      {/* Corner meta */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container-wide pt-28 flex justify-between items-start text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(249,249,246,0.75)" }}>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.4 }}>
            <div>Lat 32.2432° N</div>
            <div>Long 77.1892° E</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.5 }} className="text-right">
            <div>Manali · Himachal</div>
            <div data-testid="hero-time">{time}</div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-wide h-full flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="mb-8 flex items-center gap-3">
            <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
              A Boutique Retreat · Est 2020
            </span>
          </motion.div>

          {/* Kinetic H1 — line-by-line mask */}
          <h1
            data-testid="hero-title"
            className="font-serif hero-text-shadow"
            style={{
              color: "var(--bg-primary)",
              lineHeight: 0.92,
              fontSize: "clamp(56px, 12vw, 176px)",
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            {["The Honey", "Woods —", <span key="i" style={{ fontStyle: "italic", color: "var(--brand-mustard)" }}>Manali.</span>].map((line, i) => (
              <span key={i} className="line-mask">
                <motion.span variants={lineVariants} initial="hidden" animate="show" custom={i}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 max-w-xl font-sans"
            style={{ color: "rgba(249,249,246,0.85)", fontSize: 16, lineHeight: 1.7 }}
          >
            A three-star mountain house on Nagar Road, wrapped in pine, cedar and the smell of morning tea. Rooms shaped by wood, windows shaped by the Himalayas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-reserve"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
              style={{ background: "var(--brand-mustard)", color: "var(--bg-dark)", borderColor: "var(--brand-mustard)" }}
            >
              Reserve a stay
              <span aria-hidden>→</span>
            </button>
            <button
              data-testid="hero-cta-packages"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
              style={{ color: "var(--bg-primary)", borderColor: "rgba(249,249,246,0.5)" }}
            >
              View packages
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-center gap-3"
        style={{ color: "rgba(249,249,246,0.75)" }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <motion.span
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 34, background: "var(--brand-mustard)" }}
        />
      </motion.div>
    </section>
  );
}
