import Profile from "@/components/dashboard/profile/profile";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";

export default async function DashboardProfile() {
  const session = (await auth()) as unknown as SessionType;

  return <Profile email={session?.user?.email} />;
}
