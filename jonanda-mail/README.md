# JONANDA MAIL — Centralized Business Email & Ecosystem Communication Platform

> **Primary Domain**: [https://mail.jonanda.com](https://mail.jonanda.com)  
> **Application Portal**: [https://app.mail.jonanda.com](https://app.mail.jonanda.com)  
> **Backend API Service**: [https://api.mail.jonanda.com](https://api.mail.jonanda.com)  
> **Developer Documentation**: [https://docs.mail.jonanda.com](https://docs.mail.jonanda.com)  
> **System Telemetry & Status**: [https://status.mail.jonanda.com](https://status.mail.jonanda.com)

---

## 1. System Overview

**JONANDA MAIL** is the centralized, multi-tenant enterprise business email and campaign communication platform engineered for **JONANDA LLC** and its portfolio ventures.

The platform provides a unified control plane for:
- **Ecosystem Multi-Project Management**: Isolated workspaces for JONANDA LLC, EqualShare Foundation, Jonanda Coin (JNDA), Jonanda Studio, Jonanda SEO, Jonanda Influencer, and Jonanda Security Toolkit.
- **Threaded Webmail Client**: Full-featured conversation threading, rich text compose with attachments, reply/reply-all/forward, labels/folders, and draft autosave.
- **Automated DNS & Deliverability Engine**: Automated SPF, DKIM (2048-bit RSA), DMARC (`p=reject`), and MX record generation and DNS-over-HTTPS (DoH) verification.
- **Compliant Campaign Broadcasts**: Audience segmentation, visual template block builder, pre-built templates, anti-spam validation, and real-time deliverability telemetry (delivery rate, open rate, CTR, bounce tracking, suppression list).
- **Security & RBAC**: Multi-role authorization (`Super Admin`, `Organization Admin`, `Member`, `Viewer`), TOTP 2FA, immutable audit trail logging, and tenant data isolation.
- **Clean Infrastructure Abstraction**: Separation of Application Layer, Infrastructure Layer (`EmailProvider` for SMTP/IMAP/SES/Postmark), and DNS Layer (`DnsVerifier`).

---

## 2. Supported Ecosystem Projects & Statuses

| Project | Category | Domain | Status | Email Identities |
| :--- | :--- | :--- | :--- | :--- |
| **JONANDA LLC** | Parent Corporate Entity & Tech Holding | `jonanda.com` | `Live` | `contact@`, `support@`, `info@` |
| **EqualShare Foundation** | Social Impact & Accessible Technology | `equalshare.org` | `Active` | `contact@`, `support@` |
| **Jonanda Coin (JNDA)** | Web3 & AI Digital Asset Ecosystem | Staging | `Active` | In staging |
| **Jonanda Studio** | AI & Intelligent Workflows | Staging | `Coming Soon` | Coming Soon |
| **Jonanda SEO** | Automated SEO Intelligence | Staging | `Coming Soon` | Coming Soon |
| **Jonanda Influencer** | Creator Economy & Campaigns | Staging | `Coming Soon` | Coming Soon |
| **Jonanda Security Toolkit** | Defensive Diagnostics (R&D) | Staging | `R&D` | Coming Soon |

---

## 3. Cryptographic DNS Deliverability Standards

For every configured domain, JONANDA MAIL generates and validates:

1. **SPF (Sender Policy Framework)**
   ```txt
   Type: TXT
   Host: @
   Value: v=spf1 include:_spf.mail.jonanda.com ~all
   ```

2. **DKIM (DomainKeys Identified Mail - 2048-bit RSA)**
   ```txt
   Type: TXT
   Host: jonanda._domainkey.yourdomain.com
   Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
   ```

3. **DMARC (Domain-based Message Authentication, Reporting & Conformance)**
   ```txt
   Type: TXT
   Host: _dmarc.yourdomain.com
   Value: v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@mail.jonanda.com
   ```

4. **MX (Mail Exchange Relay)**
   ```txt
   Type: MX
   Host: @
   Value: mail.jonanda.com
   Priority: 10
   ```

---

## 4. Architecture & Layer Separation

```
┌────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                    │
│   Webmail UI • Campaign Wizard • Template Builder      │
│   Contact CRM • Audit Logs • Super Admin Dashboard     │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                 INFRASTRUCTURE ADAPTERS                │
│   EmailProvider Interface:                             │
│     ├── SmtpEmailProvider (Standard SMTP/IMAP Relay)   │
│     ├── AwsSesEmailProvider (Amazon SES API)           │
│     ├── CloudflareEmailRoutingProvider                 │
│     └── MockLocalEmailProvider (RFC-5322 Simulated)    │
│   DnsVerifier Interface:                               │
│     ├── CloudflareDnsVerifier (Cloudflare API)         │
│     └── DohDnsVerifier (DNS-over-HTTPS 1.1.1.1)        │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                       DNS LAYER                        │
│   Cloudflare DNS • SPF • DKIM (2048) • DMARC • MX      │
└────────────────────────────────────────────────────────┘
```

---

## 5. Development & Deployment

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (TypeScript check & Vite bundling)
npm run build
```

### Cloudflare Deployment
Deploy to Cloudflare Pages or Cloudflare Workers using `wrangler.toml`:
```bash
npx wrangler pages deploy dist
```
