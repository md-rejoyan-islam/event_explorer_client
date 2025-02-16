import MessagesTable from "@/components/dashboard/user-messages-table";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";

export default async function Messages() {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return (
    <>
      <div>
        <MessagesTable userId={id} />
      </div>
    </>
  );
}
