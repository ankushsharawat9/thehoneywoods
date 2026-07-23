const LOGO = "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/6hlb15to_logoCreator_imagetologo.jpg";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="pt-24 pb-10" style={{ background: "var(--bg-dark)", color: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img src={LOGO} alt="The Honey Woods" style={{ width: 64, height: 64, objectFit: "contain", background: "var(--bg-primary)", padding: 6 }} />
              <div>
                <div className="font-serif" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>The Honey Woods</div>
                <div className="font-sans mt-1" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--brand-mustard)" }}>Making lives worth living</div>
              </div>
            </div>
            <p className="font-sans mt-8 max-w-md" style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(249,249,246,0.7)" }}>
              A three-star wooden retreat on Nagar Road, wrapped in pine and cedar. Family run since 2020.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-mustard)" }}>Contact</div>
            <ul className="mt-5 space-y-3 font-sans" style={{ fontSize: 14, color: "rgba(249,249,246,0.85)" }}>
              <li><a data-testid="footer-phone" href="tel:+919211011155">+91 92110 11155</a></li>
              <li>Nagar Road, Shuru Rd</li>
              <li>Manali, HP 175143</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--brand-mustard)" }}>Front desk hours</div>
            <ul className="mt-5 space-y-3 font-sans" style={{ fontSize: 14, color: "rgba(249,249,246,0.85)" }}>
              <li>Check-in · 11:30 AM</li>
              <li>Check-out · 10:00 AM</li>
              <li>Reception · 24 × 7</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8" style={{ borderTop: "1px solid rgba(249,249,246,0.12)" }}>
          <div className="font-sans" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(249,249,246,0.55)" }}>
            © {new Date().getFullYear()} The Honey Woods · Manali · All rights reserved
          </div>
          <div className="font-serif italic" style={{ fontSize: 14, color: "rgba(249,249,246,0.55)" }}>
            32.2432° N · 77.1892° E
          </div>
        </div>
      </div>
    </footer>
  );
}
