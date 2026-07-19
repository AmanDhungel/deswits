import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Deswits — Blockchain Startup Investments",
    template: "%s | Deswits",
  },
  description:
    "Deswits helps everyday investors back promising startups securely, using blockchain-verified deal flow and laser-precision diligence technology.",
  keywords: [
    "Deswits",
    "blockchain investment",
    "startup investment",
    "Nepal investors",
    "secure blockchain investing",
  ],
  metadataBase: new URL("https://deswits.com"),
  openGraph: {
    title: "Deswits — Blockchain Startup Investments",
    description:
      "Invest in vetted startups with blockchain-grade security and transparency.",
    siteName: "Deswits",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster richColors theme="dark" position="top-right" />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
