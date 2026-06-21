# Anjali Patel — Portfolio

Personal portfolio site for Anjali Patel, a Computer & Information Technology student at Purdue focused on cybersecurity and security engineering (cloud threat hunting, ICS security, EDR, and enterprise infrastructure).

Live: https://anjalipatel.app

## Tech Stack

- **TanStack Start** (React 19 + file-based routing) on Vite 7
- **Tailwind CSS v4** with semantic design tokens in `src/styles.css`
- **TypeScript** (strict)
- **Lucide** icons
- Deployed on Lovable (Cloudflare Workers runtime)

## Features

- Animated hero with floating orbs, typed tagline, and headshot
- Lavender → sky-blue ombré color system (fully tokenized, dark-mode aware)
- Scroll-reveal animations via a custom `useReveal` hook (`IntersectionObserver`)
- `prefers-reduced-motion` support
- Project cards, roles, and contact section
- SEO meta + OG/Twitter tags per route

## Project Structure

```
src/
  routes/
    __root.tsx        # App shell (html/head/body, providers)
    index.tsx         # Home / portfolio page
  hooks/
    use-reveal.ts     # IntersectionObserver-based reveal hook
  assets/
    headshot.png      # Profile photo
  styles.css          # Tailwind v4 + design tokens + keyframes
  components/ui/      # shadcn/ui primitives
```

## Local Development

```bash
bun install
bun run dev
```

Open http://localhost:8080.

## Deployment

Changes go live by clicking **Publish → Update** in the Lovable editor. The custom domain (`anjalipatel.app`) is wired through Project Settings → Domains.

## Credits

Built with [Lovable](https://lovable.dev).
