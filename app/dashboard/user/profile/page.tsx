import Profile from "@/components/dashboard/profile/profile";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Event Explorer",
  description:
    "User can view and update their profile details in the dashboard.",
};

export default async function DashboardProfile() {
  const session = (await auth()) as unknown as SessionType;

  return <Profile email={session?.user?.email} />;
}
