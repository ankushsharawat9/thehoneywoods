import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Star } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API}/reviews`).then((r) => setReviews(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!reviews.length) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6500);
    return () => clearInterval(t);
  }, [reviews]);

  const current = reviews[index];

  return (
    <section id="reviews" data-testid="reviews-section" className="py-24 md:py-40" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                In their words
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-serif" style={{ fontSize: 72, lineHeight: 1, color: "var(--brand-mustard)" }}>4.7</span>
              <div>
                <div className="flex" style={{ color: "var(--brand-mustard)" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="font-sans mt-1" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-secondary)" }}>696 reviews · Google</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-serif" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              Guests, in their<br />
              <span style={{ fontStyle: "italic" }}>own words.</span>
            </h2>
          </div>
        </div>

        {/* Featured rotating review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[280px]">
          <div className="lg:col-span-2">
            <div className="font-serif" style={{ fontSize: 140, lineHeight: 0.8, color: "var(--brand-mustard)", opacity: 0.9 }}>“</div>
          </div>
          <div className="lg:col-span-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-serif italic" style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.4, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                    {current.text}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-10 h-[1px]" style={{ background: "var(--brand-mustard)" }} />
                    <div className="font-sans" style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-primary)" }}>
                      {current.author} · <span style={{ color: "var(--text-secondary)" }}>{current.location}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-12 flex gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.id}
              data-testid={`review-dot-${i}`}
              onClick={() => setIndex(i)}
              aria-label={`review ${i + 1}`}
              style={{
                width: index === i ? 40 : 14,
                height: 2,
                background: index === i ? "var(--brand-mustard)" : "rgba(18,18,18,0.3)",
                transition: "all 400ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
