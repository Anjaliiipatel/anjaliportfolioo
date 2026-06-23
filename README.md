# Anjali Patel — Portfolio

Personal portfolio site for **Anjali Patel**, a Computer & Information Technology student at Purdue with a focus on cybersecurity, security engineering, and enterprise infrastructure (cloud threat hunting, ICS security, EDR, and SOC operations).

**Live:** https://anjalipatel.app  
**Preview:** https://id-preview--1717b244-94a0-4521-af89-a930841cfda0.lovable.app

---

## Tech Stack

- **TanStack Start** — full-stack React 19 framework with file-based routing and server functions
- **Vite 7** — build tooling
- **Tailwind CSS v4** — utility-first styling with semantic design tokens in `src/styles.css`
- **TypeScript** — strict mode enabled
- **Lovable Cloud / Supabase** — backend, auth, and data storage
- **Lucide React** — iconography
- **Recharts** — data visualization for analytics
- **Deployed on Lovable** — Cloudflare Workers runtime

---

## Features

### Public Portfolio

- Animated hero with floating orbs, typed tagline, and profile headshot
- Lavender → sky-blue ombré color system, fully tokenized and dark-mode aware
- Scroll-reveal animations via a custom `useReveal` hook (`IntersectionObserver`)
- `prefers-reduced-motion` support for accessibility
- Project cards, experience/roles, and contact section
- SEO meta + Open Graph / Twitter tags per route

### Owner-Only Admin Center (`/analytics`)

- Password-protected analytics dashboard for the site owner
- Live dashboard feel with auto-refresh polling, "active now" visitors, and new-view alerts
- Section navigation: Overview, Visitors, Pages, Locations, Tech, and Live feed
- Custom bar charts for daily/hourly traffic, top pages, referrers, and locations
- Searchable recent-visitor table with device, browser, OS, and location metadata
- Owner visits are automatically excluded from tracking once the admin center is unlocked
- Lock / unlock session management via `sessionStorage`

### Analytics Tracking

- Lightweight page-view tracking via server functions
- `/me` endpoint flags the owner device so their own visits are skipped
- Public guest users see the portfolio normally; owner access is hidden behind the admin password

---

## Project Structure

```
src/
  routes/
    __root.tsx        # App shell (html/head/body, providers)
    index.tsx         # Home / portfolio landing page
    analytics.tsx     # Owner-only admin analytics center
    me.tsx            # Owner device flagging endpoint
  lib/
    analytics.functions.ts    # Server functions for analytics data
    analytics-tracker.ts      # Client-side tracking + owner exclusion helpers
  hooks/
    use-reveal.ts     # IntersectionObserver-based reveal hook
  assets/
    headshot.png      # Profile photo
  styles.css          # Tailwind v4 + design tokens + keyframes
  components/ui/      # shadcn/ui primitives
```

---

## Local Development

```bash
bun install
bun run dev
```

Open http://localhost:8080.

---

## Build & Preview

```bash
bun run build        # Production build
bun run preview      # Preview the production build locally
```

---

## Deployment

Changes go live by clicking **Publish → Update** in the Lovable editor. The custom domain (`anjalipatel.app`) and aliases are wired through **Project Settings → Domains**.

---

## Credits

Built with [Lovable](https://lovable.dev).
