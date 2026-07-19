"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/site/network-background";
import { StatCard } from "@/components/site/stat-card";

const STATS = [
  { value: "$42M+", label: "Deal flow secured" },
  { value: "128", label: "Startups vetted" },
  { value: "18K+", label: "Global investors" },
  { value: "99.9%", label: "Ledger uptime" },
];

export function HeroSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            className="h-full w-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.svg"
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        ) : null}
        <NetworkBackground className="opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-background" />
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-28 pb-20 text-center sm:px-6 sm:pt-36 sm:pb-28 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
          <ShieldCheck className="size-3.5" />
          Blockchain-secured startup investing
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-foreground sm:text-6xl">
          Invest in tomorrow&apos;s startups with{" "}
          <span className="text-gradient-gold">laser-precise</span>,{" "}
          <span className="text-gradient-emerald">blockchain-verified</span>{" "}
          security.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Deswits connects everyday investors to vetted, high-growth startups —
          every deal recorded on-chain, every dollar tracked in real time, every
          decision backed by laser-precision diligence technology.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="glow-gold h-12 px-8 text-base"
            nativeButton={false}
            render={<Link href="/sign-up" />}
          >
            Start investing
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-emerald/30 px-8 text-base hover:bg-emerald/10"
            nativeButton={false}
            render={<Link href="#how-it-works" />}
          >
            <PlayCircle className="size-4" />
            See how it works
          </Button>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
