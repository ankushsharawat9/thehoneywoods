import { motion } from "framer-motion";

const PHONE = "919211011155"; // +91 92110 11155
const MSG = "Hi! I'd love to know more about staying at The Honey Woods.";

export default function WhatsAppFab() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MSG)}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-40 flex items-center gap-3 group"
      style={{
        bottom: 24,
        right: 24,
        background: "#25D366",
        color: "#0B141A",
        padding: "14px 18px 14px 14px",
        boxShadow: "0 12px 32px rgba(37,211,102,0.35), 0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      {/* Pulse ring */}
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#25D366" }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentColor"
        className="relative z-10"
      >
        <path d="M19.11 17.24c-.28-.14-1.66-.82-1.92-.92-.26-.09-.45-.14-.63.14-.19.28-.72.92-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.68-1.56-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.48-.63-.49-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4 0 1.42 1.03 2.79 1.17 2.98.14.19 2.03 3.09 4.91 4.33.69.3 1.22.47 1.64.6.69.22 1.32.19 1.81.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.23.16-1.34-.07-.11-.26-.19-.54-.33zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.1 1.52 5.83L4 28l6.34-1.5A11.94 11.94 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
      </svg>
      <span
        className="relative z-10 font-sans hidden sm:inline"
        style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}
      >
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
