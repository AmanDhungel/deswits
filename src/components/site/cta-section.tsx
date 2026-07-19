import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/site/network-background";
import { COMPANY } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-ink px-6 py-16 text-center sm:px-16">
          <NetworkBackground density={70} className="opacity-50" />
          <div className="bg-radial-fade pointer-events-none absolute inset-0" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">
              Ready to grow your portfolio, <span className="text-gradient-gold">securely</span>?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Create your Deswits account in minutes and get access to
              blockchain-verified startup deals built for the Nepali investor
              community and beyond.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="glow-gold h-12 px-8 text-base"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                Create free account
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-emerald/30 px-8 text-base hover:bg-emerald/10"
                nativeButton={false}
                render={<a href={COMPANY.phoneHref} />}
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
