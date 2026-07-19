# Deswits

Blockchain startup investment platform — Next.js (App Router) + TypeScript,
MongoDB, NextAuth (Google + email/password), React Query, Tailwind CSS, and
shadcn/ui, in a dark gold/emerald theme matching the Deswits brand mark.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Auth:** NextAuth v5 — Google OAuth + Credentials (email/password), JWT sessions
- **Database:** MongoDB (native driver)
- **Data fetching:** TanStack React Query
- **UI:** shadcn/ui + Tailwind CSS v4
- **Forms/validation:** react-hook-form + Zod (Nepali-phone-only signup validation)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (`.env.local`)

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string, including a database name (e.g. `.../deswits?...`). |
| `AUTH_SECRET` | Session encryption secret. Generate with `npx auth secret` or `openssl rand -base64 32`. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Add authorized redirect URI `http://localhost:3000/api/auth/callback/google` (and your production URL). |
| `NEXTAUTH_URL` | Only needed in production behind a proxy/custom domain. |

A `.env.local` with a placeholder `MONGODB_URI` and a generated `AUTH_SECRET`
is already included so `npm run build` / `npm run dev` work out of the box —
**replace `MONGODB_URI` and the Google credentials with real values** before
using auth features for real.

## Auth flows

- **Google** — `Continue with Google` on `/sign-in` or `/sign-up`. First-time
  sign-in creates the user record automatically (see `findOrCreateGoogleUser`
  in [src/lib/db/users.ts](src/lib/db/users.ts)).
- **Email/password** — `/sign-up` collects full name, email, a **Nepali
  mobile number only** (validated against `^(97|98)\d{8}$`, stored as
  `+977XXXXXXXXXX`), and a password. `/api/auth/signup`
  ([src/app/api/auth/signup/route.ts](src/app/api/auth/signup/route.ts))
  hashes the password with bcrypt and creates the user; the client then signs
  the new user in immediately via the Credentials provider.
- **`/dashboard`** is protected in two layers: [src/proxy.ts](src/proxy.ts)
  (Next.js's edge "proxy", formerly "middleware") redirects unauthenticated
  requests, and [src/app/dashboard/layout.tsx](src/app/dashboard/layout.tsx)
  re-checks the session server-side before rendering.

## Project structure

```
src/
  app/
    page.tsx                 landing page (hero video + sections)
    sign-in/, sign-up/        auth pages
    dashboard/                protected app (layout does the auth check)
    api/auth/[...nextauth]/   NextAuth route handler
    api/auth/signup/          credentials signup endpoint
    api/me/                   current-user profile endpoint (used by React Query)
  auth.ts / auth.config.ts    NextAuth config (config split edge-safe vs Node)
  proxy.ts                    route protection (Next.js "proxy"/middleware)
  components/
    ui/                       shadcn/ui primitives
    site/                     landing page building blocks (navbar, hero, cards…)
    auth/                     sign-in/up forms, Google button, Nepali phone input
    dashboard/                sidebar, topbar, stat cards, holdings table
    providers/                React Query + NextAuth session providers
  lib/                        mongodb client, validations, constants, db queries
  hooks/                      useCurrentUser, useSignup (React Query)
```

## Notes

- The dashboard's portfolio numbers ([src/lib/mock-portfolio.ts](src/lib/mock-portfolio.ts))
  are sample data for the UI — swap in a real `investments` collection + API
  route when that data model exists. The account card on the same page *is*
  wired to real data via `/api/me`.
- The hero background plays `public/videos/hero-bg.mp4` if present; see
  [public/videos/README.md](public/videos/README.md) for the file to drop in.
  Without it, the hero falls back to the animated particle-network canvas, so
  the page still looks complete.
- The logo mark in [src/components/site/logo.tsx](src/components/site/logo.tsx)
  is a hand-built SVG approximation of the brand mark (gold arrow + emerald
  node network) so the app has zero image-asset dependencies. Swap in the
  real logo file whenever you have it.
