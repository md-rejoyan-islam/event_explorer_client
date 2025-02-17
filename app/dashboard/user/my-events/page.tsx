import UserEnrolledEvents from "@/components/dashboard/user/user-enrolled-events";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";

export default async function EnrolledEvents() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Enrolled Events
      </h1>
      <UserEnrolledEvents userId={id} />
    </div>
  );
}
