import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "@/auth.config";
import { verifyOtpSchema } from "@/lib/validations";
import {
  findUserByEmail,
  findOrCreateGoogleUser,
  toPublicUser,
} from "@/lib/db/users";
import { verifyOtp } from "@/lib/otp";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "otp",
      name: "Email code",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const parsed = verifyOtpSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, otp } = parsed.data;

        const result = await verifyOtp(email, otp);
        if (!result.ok) return null;

        const user = await findUserByEmail(email);
        if (!user) return null;

        const publicUser = toPublicUser(user);
        return {
          id: publicUser.id,
          name: publicUser.fullName,
          email: publicUser.email,
          image: publicUser.image,
          phone: publicUser.phone,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;
        try {
          const dbUser = await findOrCreateGoogleUser({
            email: user.email,
            fullName: user.name ?? user.email.split("@")[0],
            image: user.image ?? undefined,
          });
          user.id = dbUser._id.toString();
          user.phone = dbUser.phone;
        } catch (error) {
          // NextAuth maps a thrown/failed signIn callback to a generic
          // "AccessDenied" page — log the real cause here (most commonly:
          // MONGODB_URI unset or unreachable in this environment) so it's
          // diagnosable from server logs instead of silently swallowed.
          console.error(
            "Google sign-in failed while syncing user to MongoDB:",
            error,
          );
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? token.sub ?? "";
        session.user.phone = token.phone;
      }
      return session;
    },
  },
});
