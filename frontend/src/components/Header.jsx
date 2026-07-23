import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { id: "story", label: "Story" },
  { id: "rooms", label: "Rooms" },
  { id: "packages", label: "Packages" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const LOGO = "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/6hlb15to_logoCreator_imagetologo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -20, duration: 1.6 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        data-testid="site-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(249,249,246,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(18,18,18,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          transition: "background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease",
        }}
      >
        <div className="container-wide flex items-center justify-between" style={{ height: 76 }}>
          <button
            data-testid="header-logo-link"
            onClick={() => go("hero")}
            className="flex items-center gap-3"
          >
            <img src={LOGO} alt="The Honey Woods" style={{ height: 44, width: 44, objectFit: "contain" }} />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="font-serif" style={{ fontSize: 16, color: scrolled ? "var(--bg-dark)" : "var(--bg-primary)", letterSpacing: "-0.01em" }}>
                The Honey Woods
              </span>
              <span className="font-sans" style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: scrolled ? "var(--text-secondary)" : "rgba(249,249,246,0.75)" }}>
                Manali · Est 2020
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                data-testid={`nav-${n.id}`}
                onClick={() => go(n.id)}
                className="group relative py-2"
              >
                <span
                  className="font-sans"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: scrolled ? "var(--bg-dark)" : "var(--bg-primary)",
                    transition: "color 250ms ease",
                  }}
                >
                  {n.label}
                </span>
                <span
                  className="absolute left-0 bottom-1 h-[1px] w-0 group-hover:w-full"
                  style={{ background: "var(--brand-mustard)", transition: "width 350ms cubic-bezier(0.22,1,0.36,1)" }}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-testid="header-book-btn"
              onClick={() => go("contact")}
              className="hidden md:inline-flex btn-primary"
              style={
                scrolled
                  ? {}
                  : {
                      background: "transparent",
                      color: "var(--bg-primary)",
                      borderColor: "var(--bg-primary)",
                    }
              }
            >
              Reserve
            </button>

            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden flex flex-col gap-[5px] p-2"
              aria-label="Menu"
            >
              <span style={{ width: 22, height: 1, background: scrolled ? "var(--bg-dark)" : "var(--bg-primary)" }} />
              <span style={{ width: 16, height: 1, background: scrolled ? "var(--bg-dark)" : "var(--bg-primary)" }} />
              <span style={{ width: 22, height: 1, background: scrolled ? "var(--bg-dark)" : "var(--bg-primary)" }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "var(--bg-dark)" }}
          >
            <div className="container-wide pt-28 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.id}
                  data-testid={`mobile-nav-${n.id}`}
                  onClick={() => go(n.id)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-left py-3"
                  style={{ fontSize: 40, color: "var(--bg-primary)", lineHeight: 1 }}
                >
                  {n.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
