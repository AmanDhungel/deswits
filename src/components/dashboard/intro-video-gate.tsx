"use client";

import { useSyncExternalStore } from "react";
import { Logo } from "@/components/site/logo";

const STORAGE_KEY = "deswits-dashboard-intro-watched";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

/**
 * Shown once per browser session right after login — the dashboard itself
 * (sidebar, topbar, pages) only renders once login.mp4 has played through
 * to the end. Revisiting /dashboard later in the same session skips
 * straight through; a fresh sign-in (new session) shows it again.
 *
 * Reads sessionStorage via useSyncExternalStore rather than an effect +
 * setState, since that's an external store read, not local component state.
 */
export function IntroVideoGate({ children }: { children: React.ReactNode }) {
  const watched = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleEnded() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    // sessionStorage writes don't fire a same-tab "storage" event, so
    // dispatch one manually to make useSyncExternalStore re-check.
    window.dispatchEvent(new Event("storage"));
  }

  if (watched) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 py-12">
      <Logo />
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/25 bg-ink glow-gold">
        <video
          className="h-full w-full"
          autoPlay
          controls
          controlsList="nodownload noplaybackrate"
          playsInline
          onEnded={handleEnded}
        >
          <source src="/videos/login.mp4" type="video/mp4" />
        </video>
      </div>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Watch the full welcome video to unlock your dashboard.
      </p>
    </div>
  );
}
