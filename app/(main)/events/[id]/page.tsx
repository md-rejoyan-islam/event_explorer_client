import EventDetails from "@/components/event/event-details";
import { auth } from "@/lib/auth";
import { getUserIdByEmail } from "@/utils/fetch-query";

import { SessionType } from "@/utils/types";

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return <EventDetails session={session} eventId={params.id} userId={id} />;
}
