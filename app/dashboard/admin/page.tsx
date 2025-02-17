import AdminDashboard from "@/components/dashboard/admin/admin-dashboard";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";

export default async function AdminDashboardPage() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <AdminDashboard userId={id} />
    </div>
  );
}
