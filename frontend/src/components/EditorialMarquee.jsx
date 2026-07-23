import Marquee from "react-fast-marquee";

export default function EditorialMarquee({ dark = false }) {
  const items = [
    "Making Lives Worth Living",
    "Est 2020",
    "Nagar Road, Manali",
    "Himachal Pradesh",
    "3-Star Luxury",
    "The Honey Woods",
  ];

  return (
    <section
      data-testid="marquee-section"
      className="py-10 md:py-14"
      style={{
        background: dark ? "var(--bg-dark)" : "var(--bg-primary)",
        borderTop: `1px solid ${dark ? "rgba(249,249,246,0.1)" : "rgba(18,18,18,0.1)"}`,
        borderBottom: `1px solid ${dark ? "rgba(249,249,246,0.1)" : "rgba(18,18,18,0.1)"}`,
      }}
    >
      <Marquee speed={30} gradient={false} pauseOnHover>
        {items.map((t, i) => (
          <span
            key={i}
            className="font-serif inline-flex items-center"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1,
              padding: "0 40px",
              color: dark ? "var(--bg-primary)" : "var(--bg-dark)",
              fontStyle: i % 2 ? "italic" : "normal",
              letterSpacing: "-0.02em",
            }}
          >
            {t}
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                background: "var(--brand-mustard)",
                marginLeft: 40,
                transform: "rotate(45deg)",
              }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
