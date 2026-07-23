import { motion } from "framer-motion";

const chapters = [
  {
    num: "01",
    title: "A house made of wood.",
    body:
      "The Honey Woods was built in 2020 as a mountain house, not a hotel. Every wall is finished in pine and cedar; every corner is warmed by the smell of tea and the rhythm of the deodar forest just outside the window.",
    image:
      "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/dr5aty8w_unnamed.jpg",
  },
  {
    num: "02",
    title: "Anchored to old Manali.",
    body:
      "We sit on Nagar Road, minutes from Old Manali, Mall Road, Vashisht and the Hadimba temple. The kind of location where guests wander out for a walk after breakfast and return with stories by dinner.",
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    num: "03",
    title: "A promise: 'Making lives worth living.'",
    body:
      "It is the line on our badge and the line we work by. Warm rooms, real food, honest sightseeing, and staff who remember your name by day two.",
    image:
      "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/p3ywh286_unnamed%20%284%29.jpg",
  },
];

function Chapter({ ch, idx }) {
  const reversed = idx % 2 === 1;
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-16 md:py-28 border-t"
      style={{ borderColor: "rgba(18,18,18,0.12)" }}
      data-testid={`chapter-${ch.num}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}
      >
        <div className="clip-frame" style={{ aspectRatio: "4/5" }}>
          <img src={ch.image} alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <div className={`lg:col-span-6 lg:col-start-${reversed ? 1 : 7} flex flex-col`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="chapter-num font-serif"
          style={{
            fontSize: "clamp(96px, 14vw, 180px)",
            lineHeight: 0.85,
            color: "var(--brand-mustard)",
            fontStyle: "italic",
            letterSpacing: "-0.04em",
          }}
        >
          {ch.num}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif mt-6 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          {ch.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-sans mt-6 max-w-lg"
          style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)" }}
        >
          {ch.body}
        </motion.p>
      </div>
    </div>
  );
}

export default function Manifesto() {
  return (
    <section id="story" data-testid="manifesto-section" className="relative py-20 md:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                Chapters
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              A short<br />
              <span style={{ fontStyle: "italic", color: "var(--brand-wood)" }}>manifesto.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-sans" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" }}>
              Three chapters on why we exist, where we sit, and how we host. Read slowly — the mountains do not rush, and neither do we.
            </p>
          </div>
        </div>

        {chapters.map((c, i) => (
          <Chapter key={c.num} ch={c} idx={i} />
        ))}
      </div>
    </section>
  );
}
