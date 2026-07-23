import { motion } from "framer-motion";
import { ExternalLink, Navigation } from "lucide-react";

const ADDRESS =
  "The Honey Woods, Nagar Road, Shuru Rd, near Old Green Tax Barrier, Manali, Himachal Pradesh 175143";
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS
)}`;
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

export default function LocationMap() {
  return (
    <section
      id="location"
      data-testid="location-section"
      className="py-24 md:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-[1px] w-10"
                style={{ background: "var(--brand-mustard)" }}
              />
              <span
                className="font-sans text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "var(--brand-mustard)" }}
              >
                Find us
              </span>
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 5.5vw, 76px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Nagar Road,
              <br />
              <span style={{ fontStyle: "italic", color: "var(--brand-wood)" }}>
                Manali.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="font-sans"
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "var(--text-secondary)",
              }}
            >
              Six minutes from Old Manali. Fifteen from Mall Road. A gentle
              turn off the main highway, into pine.
            </p>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="get-directions-btn"
              className="btn-primary mt-6"
            >
              <Navigation size={14} />
              Get directions
            </a>
          </div>
        </div>

        <motion.a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="map-embed-link"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative block clip-frame group"
          style={{
            aspectRatio: "16/8",
            border: "1px solid rgba(18,18,18,0.12)",
          }}
        >
          <iframe
            title="The Honey Woods location on Google Maps"
            src={EMBED_SRC}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "grayscale(15%)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Overlay CTA */}
          <div
            className="absolute inset-x-0 bottom-0 flex justify-between items-end p-6 md:p-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0) 60%)",
            }}
          >
            <div>
              <div
                className="font-sans"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(249,249,246,0.7)",
                }}
              >
                Location
              </div>
              <div
                className="font-serif mt-2"
                style={{
                  fontSize: "clamp(20px, 2.4vw, 30px)",
                  color: "var(--bg-primary)",
                  letterSpacing: "-0.01em",
                  maxWidth: 520,
                  lineHeight: 1.2,
                }}
              >
                Near Old Green Tax Barrier · HP 175143
              </div>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-3"
              style={{
                background: "var(--brand-mustard)",
                color: "var(--bg-dark)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
              }}
            >
              Open in Maps <ExternalLink size={12} />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
