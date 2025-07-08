import UserDashboard from "@/components/dashboard/user/user-dashboard";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard | Event Explorer",
  description:
    "User can view all the events, tickets, and profile details in the dashboard.",
};

export default async function UserDashboardPage() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        User Dashboard
      </h1>
      <UserDashboard userId={id} />
    </div>
  );
}
