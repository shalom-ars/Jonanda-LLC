# JONANDA LLC — Official Corporate Website

[![Target Domain](https://img.shields.io/badge/Domain-llc.jonanda.com-amber.svg)](https://llc.jonanda.com)
[![Jurisdiction](https://img.shields.io/badge/Jurisdiction-United%20States-blue.svg)](#)
[![Deployment](https://img.shields.io/badge/Platform-Cloudflare%20Pages-orange.svg)](#)
[![Security](https://img.shields.io/badge/Security-Zero%20Trust-emerald.svg)](#)

> Official corporate website for **JONANDA LLC** — a United States technology enterprise developing products and services across Artificial Intelligence, Web3, Cybersecurity, Software, and Digital Infrastructure.

---

## 🏛️ Corporate Overview & Separation of Entities

JONANDA LLC maintains dedicated governance for the parent company and distinct ecosystem platforms:

* **JONANDA LLC (`llc.jonanda.com`)**: Corporate parent entity providing strategic direction, architectural standards, compliance, and enterprise digital infrastructure.
* **Jonanda Coin (JNDA) (`jonanda.com`)**: AI-integrated Web3 ecosystem and decentralized digital asset platform.
* **LOZULA Cybersecurity (`lozula.com`)**: Cybersecurity technology, vulnerability assessments, and threat intelligence platform.

---

## 🚀 Technology Capabilities

1. **Artificial Intelligence**: Large language model integration, autonomous agent workflows, contextual data retrieval, and cognitive pipelines.
2. **Web3 & Blockchain**: Decentralized protocols, secure smart contract architecture, and token utility engineering.
3. **Cybersecurity**: Automated vulnerability assessments, perimeter defense, zero-trust architecture, and codebase security audits.
4. **SaaS & Software Development**: High-performance full-stack web and mobile platforms, low-latency microservices, and distributed APIs.
5. **Digital Infrastructure**: Global edge computing, resilient container orchestration, and high-availability multi-region persistence.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS (Tailored luxury dark theme with gold metallic accents)
* **Icons**: Lucide React
* **Routing**: React Router (SPA with client-side history, scroll-to-top restoration, and Cloudflare Pages redirects)
* **SEO & Metadata**: Semantic HTML5, dynamic Open Graph & Twitter Cards, Schema.org `Organization` and `WebSite` JSON-LD schemas, `robots.txt`, and `sitemap.xml`
* **Deployment**: Cloudflare Pages / Workers (configured via `wrangler.toml`, `_headers`, and `_redirects`)

---

## 📁 Repository Structure

```
Jonanda-LLC/
├── public/
│   ├── brand/
│   │   ├── jonanda-llc-logo.svg     # Full corporate logo & wordmark
│   │   ├── jonanda-llc-mark.svg     # Geometric gold brand emblem
│   │   ├── jnda-coin.webp           # Jonanda Coin ecosystem asset
│   │   └── lozula-logo.svg          # LOZULA Cybersecurity brand asset
│   ├── favicon.svg                  # High-resolution vector favicon
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # SEO indexing sitemap
│   ├── _headers                     # Cloudflare Pages security headers
│   └── _redirects                   # Cloudflare SPA fallback routing
├── src/
│   ├── components/
│   │   ├── common/                  # Navbar, Footer, TechBackground, CorporateCard, Button, SEOHead
│   │   └── home/                    # Hero, EcosystemPreview, TechPillarsPreview, CorporateSnapshot, CoreValues
│   ├── data/                        # Ecosystem, technology, company, and navigation datasets
│   ├── pages/                       # Home, About, Ecosystem, Technology, Company, Contact, Legal suite, 404
│   ├── styles/                      # Tailwind styles and custom utilities
│   ├── App.tsx                      # Router and application layout
│   └── main.tsx                     # React DOM root mounting
├── index.html                       # HTML5 template with structured data and typography
├── wrangler.toml                    # Cloudflare Pages deployment configuration
├── tailwind.config.js               # Theme definitions and color tokens
└── package.json
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile TypeScript and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Cloudflare Pages Deployment

This repository is pre-configured for automated deployment via Cloudflare Pages:

* **Build Command**: `npm run build`
* **Build Output Directory**: `dist`
* **Root Directory**: `/`
* **Node Version**: `>= 18.0.0`

---

## 🔒 Security & Privacy

* **Zero-Trust Perimeters**: Enforced across all deployment and endpoint surfaces.
* **Security Headers**: Configured with strict HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
* **Privacy Compliance**: GDPR and CCPA aligned data handling with minimal data retention.

---

## 📬 Corporate Inquiries

* **Corporate Email**: `contact@jonanda.com`
* **Official Corporate Website**: [https://llc.jonanda.com](https://llc.jonanda.com)
* **Jurisdiction**: United States

---

&copy; 2026 JONANDA LLC. All rights reserved.
