import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    phone?: string;
  }
}

// NOTE: "next-auth/jwt" re-exports JWT via `export *`, which TypeScript does
// not merge declarations through — augment the real declaring module instead.
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    phone?: string;
  }
}
