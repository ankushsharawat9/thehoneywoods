import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Clock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact({ prefillPackage, setPrefillPackage }) {
  const [packages, setPackages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    check_in: "",
    check_out: "",
    package_id: "",
    message: "",
  });

  useEffect(() => {
    axios.get(`${API}/packages`).then((r) => setPackages(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (prefillPackage) {
      setForm((f) => ({ ...f, package_id: prefillPackage }));
      setPrefillPackage?.(null);
    }
  }, [prefillPackage, setPrefillPackage]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email and phone.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form, guests: Number(form.guests) || 1 };
      const r = await axios.post(`${API}/inquiries`, payload);
      toast.success("Thank you — we'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", guests: 2, check_in: "", check_out: "", package_id: "", message: "" });
      return r;
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-40" style={{ background: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — headline & info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10" style={{ background: "var(--brand-mustard)" }} />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--brand-mustard)" }}>
                Reserve · Inquire
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.98, letterSpacing: "-0.02em" }}>
              Let us plan a<br />
              <span style={{ fontStyle: "italic", color: "var(--brand-mustard)" }}>quiet stay.</span>
            </h2>
            <p className="font-sans mt-8 max-w-md" style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              Send us a note. We reply within 24 hours with tailored options — dates, rooms, transfers and pricing.
            </p>

            <div className="mt-14 space-y-8">
              <a href="tel:+919211011155" data-testid="contact-phone" className="group flex items-start gap-4">
                <Phone size={18} className="mt-1" style={{ color: "var(--brand-mustard)" }} />
                <div>
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--text-secondary)" }}>Direct line</div>
                  <div className="font-serif mt-1" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>+91 92110 11155</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="mt-1" style={{ color: "var(--brand-mustard)" }} />
                <div>
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--text-secondary)" }}>Address</div>
                  <div className="font-serif mt-1" style={{ fontSize: 18, lineHeight: 1.5 }}>
                    Nagar Road, Shuru Rd,<br />
                    near Old Green Tax Barrier<br />
                    Village, Manali · HP 175143
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={18} className="mt-1" style={{ color: "var(--brand-mustard)" }} />
                <div>
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--text-secondary)" }}>Front desk</div>
                  <div className="font-serif mt-1" style={{ fontSize: 18, lineHeight: 1.5 }}>
                    Check-in 11:30 AM<br />
                    Check-out 10:00 AM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <motion.form
            onSubmit={submit}
            data-testid="inquiry-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:col-start-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <label className="editorial-label">Full name</label>
                <input data-testid="input-name" className="editorial-input" value={form.name} onChange={set("name")} placeholder="Aarav Mehta" required />
              </div>
              <div>
                <label className="editorial-label">Email</label>
                <input data-testid="input-email" type="email" className="editorial-input" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
              </div>
              <div>
                <label className="editorial-label">Phone</label>
                <input data-testid="input-phone" className="editorial-input" value={form.phone} onChange={set("phone")} placeholder="+91 92110 11155" required />
              </div>
              <div>
                <label className="editorial-label">Guests</label>
                <input data-testid="input-guests" type="number" min="1" max="20" className="editorial-input" value={form.guests} onChange={set("guests")} />
              </div>
              <div>
                <label className="editorial-label">Check-in</label>
                <input data-testid="input-checkin" type="date" className="editorial-input" value={form.check_in} onChange={set("check_in")} />
              </div>
              <div>
                <label className="editorial-label">Check-out</label>
                <input data-testid="input-checkout" type="date" className="editorial-input" value={form.check_out} onChange={set("check_out")} />
              </div>
              <div className="md:col-span-2">
                <label className="editorial-label">Package (optional)</label>
                <select data-testid="input-package" className="editorial-input" value={form.package_id} onChange={set("package_id")}>
                  <option value="">— No package / just a room</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>{p.title} — {p.duration}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="editorial-label">Your note</label>
                <textarea data-testid="input-message" rows={3} className="editorial-input" value={form.message} onChange={set("message")} placeholder="Anything we should know — dietary needs, celebrations, arrival details." style={{ resize: "vertical" }} />
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 items-center">
              <button data-testid="submit-inquiry" type="submit" disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}>
                {submitting ? "Sending…" : "Send inquiry"} {!submitting && "→"}
              </button>
              <span className="font-sans" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                We reply within 24 hours
              </span>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
