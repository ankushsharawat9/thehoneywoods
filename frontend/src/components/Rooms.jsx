import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${API}/rooms`).then((r) => setRooms(r.data)).catch(() => {});
  }, []);

  return (
    <section id="rooms" data-testid="rooms-section" className="py-24 md:py-40" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
              — The Rooms
            </span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Wood, warmth,<br />
              <span style={{ fontStyle: "italic", color: "var(--brand-mustard)" }}>a slow morning.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {rooms.map((room, i) => (
            <motion.article
              key={room.id}
              data-testid={`room-card-${room.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${i % 3 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="clip-frame relative overflow-hidden" style={{ aspectRatio: i === 0 ? "4/5" : "1/1" }}>
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at center, rgba(197,155,39,0.15), transparent 70%)" }}
                />
              </div>

              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--text-secondary)" }}>
                    0{i + 1} · Room
                  </div>
                  <h3 className="font-serif mt-2" style={{ fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                    {room.name}
                  </h3>
                </div>
              </div>

              <p className="font-sans mt-4 max-w-md" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)" }}>
                {room.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {room.features.map((f) => (
                  <li
                    key={f}
                    className="font-sans"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                      borderBottom: "1px solid rgba(18,18,18,0.25)",
                      paddingBottom: 2,
                    }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
