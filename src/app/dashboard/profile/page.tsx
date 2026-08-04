import type { Metadata } from "next";

import { ProfileCard } from "@/components/dashboard/profile-card";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account details and verification status.
        </p>
      </div>

      <div className="max-w-md">
        <ProfileCard />
      </div>
    </div>
  );
}
