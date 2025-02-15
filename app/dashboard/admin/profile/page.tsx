import Profile from "@/components/dashboard/profile/profile";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";

export default async function UserProfile() {
  const session = (await auth()) as unknown as SessionType;

  return <Profile email={session?.user?.email} />;
}
