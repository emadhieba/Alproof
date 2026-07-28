# PROF Barbershop Website

Premium luxury men's barbershop website built with **Angular 19**, featuring bilingual support (English/Arabic), glassmorphism design, and WhatsApp booking integration.

## Tech Stack

- Angular 19 (Standalone Components)
- TypeScript
- SCSS + Bootstrap 5
- Font Awesome 6
- ngx-translate (i18n)
- AOS (Animate On Scroll)

## Features

- Luxury Black & Gold theme
- Arabic (RTL) / English (LTR) language switching
- Responsive design with mobile hamburger menu
- Sticky transparent navbar (turns solid on scroll)
- Services, Gallery (masonry + lightbox), Testimonials slider
- WhatsApp booking (no backend required)
- Floating WhatsApp, Call, and Back-to-Top buttons
- SEO meta tags, lazy-loaded images, loading animation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Configuration

Edit `src/environments/environment.ts` to configure:

- `phoneNumber` — WhatsApp/phone number (without +)
- `whatsappMessage` — Pre-filled booking message
- `instagram`, `facebook` — Social media links
- `address`, `mapEmbedUrl` — Contact details

## Project Structure

```
src/app/
├── components/
│   ├── navbar/
│   ├── hero/
│   ├── about/
│   ├── services/
│   ├── gallery/
│   ├── why-us/
│   ├── testimonials/
│   ├── contact/
│   ├── footer/
│   └── floating-buttons/
├── models/          # TypeScript interfaces
├── services/        # Data, Contact, Language, SEO
src/assets/
├── data/            # JSON content files
└── i18n/            # Translation files (en.json, ar.json)
```

## Content Management

All dynamic content is stored in JSON files under `src/assets/data/`:

- `services.json` — Service cards with prices
- `testimonials.json` — Customer reviews
- `gallery.json` — Gallery images
- `why-us.json` — Why choose us items
- `about-features.json` — About section features

Translations are in `src/assets/i18n/en.json` and `ar.json`.

## License

Private — PROF Barbershop © 2026
