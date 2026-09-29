# Image Clinic: Website

Website for **Image Clinic**, a doctor-led hair, skin and aesthetic clinic with branches in **Greater Kailash (New Delhi)** and **Gurugram**.

🌐 **Live site:** [imageclinicindia.co](https://imageclinicindia.co)

> Designed & developed by [Aniket Jamunde](https://aniketwebdev.in) · [aniketwebdev.in](https://aniketwebdev.in)

---

## ✨ Overview

A fast, mobile-first, multi-branch website built to help patients find the nearest clinic, see real results, get their questions answered and book an appointment.

### Key features

- **Multi-branch structure**: dedicated pages for the Greater Kailash and Gurugram clinics (`/greater-kailash`, `/gurugram`), each with its own address, map and directions
- **Hero section** with clear calls to action for clinics and treatments
- **Clinics section** with address cards, embedded Google Maps and "Get directions" links
- **Gallery** showing reception, waiting lounge and treatment rooms
- **Results section** with real before/after and skin result images
- **FAQ** covering appointments, first visit, sessions, payment options and safety for Indian skin tones
- **Smooth animations** powered by GSAP
- **Instagram link** and contact links in the footer
- **Legal page** with Privacy Policy and Terms of Service
- **Local SEO**: meta tags, Open Graph / Twitter cards, keywords for Delhi and Gurugram, and a branded theme colour

---

## 🛠 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI library | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [GSAP](https://gsap.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Linting | ESLint 9 + `eslint-config-next` |
| Hosting | Vercel |

---

## 📁 Project Structure

```
image-clinic/
├── public/              # Static assets (logo, gallery, results images)
├── src/                 # App source (pages, components, styles)
├── next.config.ts       # Next.js configuration
├── postcss.config.mjs   # PostCSS / Tailwind config
├── tsconfig.json        # TypeScript config
├── eslint.config.mjs    # ESLint config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- npm (or yarn / pnpm / bun)

### Installation

```bash
git clone https://github.com/aanyaas-resp/image-clinic.git
cd image-clinic
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase with ESLint |

---

## ☁️ Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main` can trigger a new production deployment.

---

## ⚡ Performance & SEO

- Images served as optimized **WebP** through `next/image`
- Fonts loaded with `next/font`
- Semantic HTML and descriptive `alt` text on gallery and result images
- Open Graph and Twitter card metadata for rich link previews
- Separate location pages targeting local searches (Greater Kailash, Gurugram)

---

## 🔒 License, Privacy & Disclaimer

**© 2026 Image Clinic. All rights reserved.**

This repository contains a **custom website built for a client**. The source code, design, text, logos, photographs, before/after results and all other assets are the **private property of Image Clinic and the developer**.

- This code is **not open source** and is **not licensed** for reuse, copying, redistribution or resale.
- Clinic branding, patient result images and content may **not** be used elsewhere without written permission.
- The code is shared here for **portfolio and reference purposes only**.

Want a website like this for your business? [Get in touch](https://aniketwebdev.in).

---

## 👨‍💻 Developer

**Aniket Jamunde**, Freelance Web Developer
[aniketwebdev.in](https://aniketwebdev.in) · [GitHub](https://github.com/aanyaas-resp)
