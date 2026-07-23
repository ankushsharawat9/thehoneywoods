# The Honey Woods Hotel — PRD

## Problem Statement
Website for The Honey Woods Hotel (Nagar Road, Manali · 4.7★ · 696 reviews · +91 92110 11155).
Award-worthy editorial "modern classic" boutique hotel site with kinetic hero, numbered manifesto chapters, slow marquee, Lenis smooth scroll, framer-motion reveals, real product photography with clipped frames, multiple packages, reviews and a booking inquiry form.

## User Personas
- **Traveller planning a Manali trip** — browses story, rooms, packages, gallery, reviews → submits inquiry.
- **Hotel owner (Honey Woods)** — receives inquiries in DB (and email once Resend key set).

## Architecture
- **Backend**: FastAPI + MongoDB (Motor). Static content served from server-side constants (packages, rooms, reviews). Inquiries persisted to `inquiries` collection. Resend (optional) for owner email notification.
- **Frontend**: React 19 + Tailwind + framer-motion + Lenis + react-fast-marquee. Playfair Display + Manrope fonts. Editorial mustard/charcoal/cream palette.

## Endpoints
- `GET  /api/packages` · `GET /api/packages/{id}`
- `GET  /api/rooms`
- `GET  /api/reviews`
- `POST /api/inquiries` · `GET /api/inquiries`

## Implemented (2026-12)
- Kinetic hero with masked line-by-line reveal + parallax mountain background + live IST time chip
- Sticky glass-transition header with anchor navigation & mobile menu
- Numbered manifesto (3 chapters) with asymmetric clipped frames
- Rooms showcase with staggered layout & hover motion
- Packages section (2 packages, tab switcher, day-by-day itinerary, inclusions/exclusions, on-request pricing)
- Gallery with per-item parallax
- Two editorial marquees (light + dark)
- Reviews with auto-rotating featured quote + 4.7★ Google summary
- Contact / inquiry form (editorial underline inputs, sonner toasts) storing to Mongo + optional Resend email
- Footer with contact, hours, coordinates

## Backlog / Next Actions
- **P0** — Add real hotel photos in higher resolution as owner provides them
- **P1** — Wire Resend by adding a valid `RESEND_API_KEY` + verified sender/recipient in `/app/backend/.env`
- **P1** — Add package pricing once owner shares numbers
- **P2** — Admin dashboard to view/manage inquiries
- **P2** — WhatsApp click-to-chat CTA (widely used in Indian hospitality)
- **P2** — Multi-language (Hindi) toggle
