import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Next.js 16 renamed the "middleware" file convention to "proxy". Its static
// export analyzer only recognizes plain `export default` / `export const
// proxy = ...` — not destructured exports — so we bind `auth` to a variable
// first instead of `export const { auth: proxy } = NextAuth(authConfig)`.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Run on everything except static assets / Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)"],
};
