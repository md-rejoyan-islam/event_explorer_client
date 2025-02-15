import EnrolledUserTable from "@/components/dashboard/admin/enrolled-user-table";
import apolloClient from "@/lib/apollo-client";
import { auth } from "@/lib/auth";
import { GET_ENROLLED_EVENTS_BY_USER_ID } from "@/queries/enrolled.query";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";

export default async function EnrolledEvents() {
  // const pathname = usePathname();
  // const isAdmin = pathname.includes("/admin"); // This is a simple check, replace with actual auth logic

  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  const {
    data: { events },
  } = await apolloClient.query({
    query: GET_ENROLLED_EVENTS_BY_USER_ID,
    variables: { authorId: id },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Enrolled Events</h1>
      <div className="">
        <EnrolledUserTable events={events} />
      </div>
    </div>
  );
}
