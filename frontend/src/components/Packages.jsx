import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Packages({ onInquire }) {
  const [packages, setPackages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    axios.get(`${API}/packages`).then((r) => {
      setPackages(r.data);
      setActive(r.data[0]?.id ?? null);
    }).catch(() => {});
  }, []);

  const current = packages.find((p) => p.id === active);

  return (
    <section id="packages" data-testid="packages-section" className="py-24 md:py-40" style={{ background: "var(--bg-dark)", color: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                Journeys we curate
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Packages,<br />
              <span style={{ fontStyle: "italic", color: "var(--brand-mustard)" }}>with intention.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-sans" style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(249,249,246,0.7)" }}>
              Volvo transfers, private cabs, home-style meals — every itinerary is built for a slow, honest experience of the mountains. Contact us for pricing.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {packages.map((p) => (
            <button
              key={p.id}
              data-testid={`pkg-tab-${p.id}`}
              onClick={() => setActive(p.id)}
              className="font-sans px-5 py-3"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                background: active === p.id ? "var(--brand-mustard)" : "transparent",
                color: active === p.id ? "var(--bg-dark)" : "var(--bg-primary)",
                border: `1px solid ${active === p.id ? "var(--brand-mustard)" : "rgba(249,249,246,0.3)"}`,
                transition: "all 300ms ease",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14"
            >
              {/* Image */}
              <div className="lg:col-span-5">
                <div className="clip-frame" style={{ aspectRatio: "4/5" }}>
                  <img src={current.hero_image} alt={current.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-6 flex items-center gap-6" style={{ color: "rgba(249,249,246,0.6)" }}>
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.28em] uppercase">Duration</div>
                    <div className="font-serif mt-1" style={{ fontSize: 22, color: "var(--bg-primary)" }}>{current.duration}</div>
                  </div>
                  <div className="h-8 w-[1px]" style={{ background: "rgba(249,249,246,0.2)" }} />
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.28em] uppercase">Pricing</div>
                    <div className="font-serif mt-1" style={{ fontSize: 22, color: "var(--brand-mustard)", fontStyle: "italic" }}>On request</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-7">
                <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                  {current.subtitle}
                </div>
                <h3 className="font-serif mt-3" style={{ fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                  {current.title}
                </h3>

                {/* Itinerary */}
                <div className="mt-10">
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: "rgba(249,249,246,0.55)" }}>
                    Itinerary
                  </div>
                  <ol className="space-y-0">
                    {current.itinerary.map((it, idx) => (
                      <li
                        key={idx}
                        data-testid={`pkg-itinerary-${idx}`}
                        className="grid grid-cols-12 gap-4 py-5"
                        style={{ borderTop: "1px solid rgba(249,249,246,0.1)" }}
                      >
                        <div className="col-span-2 md:col-span-1 font-serif italic" style={{ fontSize: 22, color: "var(--brand-mustard)" }}>{it.day}</div>
                        <div className="col-span-10 md:col-span-4 font-serif" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>{it.title}</div>
                        <div className="col-span-12 md:col-span-7 font-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(249,249,246,0.65)" }}>{it.detail}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Inclusions & exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: "var(--brand-mustard)" }}>Included</div>
                    <ul className="space-y-3">
                      {current.inclusions.map((x, i) => (
                        <li key={i} className="font-sans flex gap-3" style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(249,249,246,0.85)" }}>
                          <span style={{ color: "var(--brand-mustard)" }}>+</span>{x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: "rgba(249,249,246,0.55)" }}>Excluded</div>
                    <ul className="space-y-3">
                      {current.exclusions.map((x, i) => (
                        <li key={i} className="font-sans flex gap-3" style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(249,249,246,0.55)" }}>
                          <span>—</span>{x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="mt-10 font-sans"
                  style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brand-mustard)", borderTop: "1px solid rgba(249,249,246,0.15)", paddingTop: 16 }}
                >
                  {current.note}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    data-testid={`pkg-inquire-${current.id}`}
                    onClick={() => onInquire?.(current.id)}
                    className="btn-primary"
                    style={{ background: "var(--brand-mustard)", color: "var(--bg-dark)", borderColor: "var(--brand-mustard)" }}
                  >
                    Inquire about this package →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
