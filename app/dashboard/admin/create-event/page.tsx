import CreateEventForm from "@/components/dashboard/admin/create-event";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event | Event Explorer",
  description: "Admin can create an event in the dashboard.",
};

export default async function CreateEvent() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div className="max-w-xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Create An Event
      </h1>
      <CreateEventForm adminId={id} />
    </div>
  );
}
