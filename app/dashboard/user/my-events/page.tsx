import UserEnrolledEvents from "@/components/dashboard/user/user-enrolled-events";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Enrolled Events | Event Explorer",
  description:
    "User can view all the events in which they have enrolled in the dashboard.",
};

export default async function EnrolledEvents() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        My Enrolled Events
      </h1>
      <UserEnrolledEvents userId={id} />
    </div>
  );
}
