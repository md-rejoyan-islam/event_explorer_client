import AdminDashboard from "@/components/dashboard/admin/admin-dashboard";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Event Explorer",
  description:
    "Admin can view and manage all the events and users in the dashboard.",
};

export default async function AdminDashboardPage() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Admin Dashboard
      </h1>
      <AdminDashboard userId={id} />
    </div>
  );
}
