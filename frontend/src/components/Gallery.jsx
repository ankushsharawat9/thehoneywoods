import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IMAGES = [
  { url: "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/dr5aty8w_unnamed.jpg", label: "Deluxe Woodland", ratio: "3/4" },
  { url: "https://images.unsplash.com/photo-1613551356451-22d6cb1503aa?crop=entropy&cs=srgb&fm=jpg&q=85", label: "The Higher Ridges", ratio: "1/1" },
  { url: "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/8hdceg8a_unnamed%20%285%29.jpg", label: "The Marble Bath", ratio: "3/4" },
  { url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=srgb&fm=jpg&q=85", label: "Deodar Forest", ratio: "4/5" },
  { url: "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/p3ywh286_unnamed%20%284%29.jpg", label: "Premium Cedar Suite", ratio: "4/5" },
  { url: "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/82g4civp_hotal.jpg", label: "The House", ratio: "3/4" },
];

function GalleryItem({ item, idx }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`gallery-item-${idx}`}
      className="group"
      style={{ marginTop: idx % 3 === 1 ? "5rem" : idx % 3 === 2 ? "2rem" : "0" }}
    >
      <div className="clip-frame overflow-hidden" style={{ aspectRatio: item.ratio }}>
        <motion.img
          src={item.url}
          alt={item.label}
          className="w-full h-full object-cover"
          style={{ y }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-sans" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
          0{idx + 1}
        </span>
        <span className="font-serif italic" style={{ fontSize: 14, color: "var(--text-primary)" }}>{item.label}</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 md:py-40" style={{ background: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                Field notes
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              A gallery, in<br />
              <span style={{ fontStyle: "italic", color: "var(--brand-wood)" }}>six frames.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {IMAGES.map((it, i) => (
            <GalleryItem key={i} item={it} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
