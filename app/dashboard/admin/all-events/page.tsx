import AdminAllEvents from "@/components/dashboard/admin/all-events";
import { auth } from "@/lib/auth";

import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin All Events | Event Explorer",
  description: "Admin can view all the events in the dashboard.",
};

export default async function AllEvents() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <AdminAllEvents userId={id} />
    </div>
  );
}
