import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config (no MongoDB/bcrypt imports here — this is consumed by
 * middleware.ts, which runs on the Edge runtime). Providers that need
 * Node-only APIs are added on top of this in `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) return isLoggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
