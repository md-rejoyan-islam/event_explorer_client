import EventDetails from "@/components/event/event-details";
import apolloClient from "@/lib/apollo-client";
import { auth } from "@/lib/auth";
import { GET_EVENT_BY_ID } from "@/queries/event.query";
import { getUserIdByEmail } from "@/utils/fetch-query";

import { SessionType } from "@/utils/types";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  try {
    const {
      data: { event },
    } = await apolloClient.query({
      query: GET_EVENT_BY_ID({
        query: `title, description `,
      }),
      variables: { id },
    });
    return {
      title: event?.title,
      description: event?.description,
    };
  } catch {
    return {
      title: "Event Not Found",
      description: "The event you are looking for does not exist.",
    };
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = (await auth()) as unknown as SessionType;

  const id = await getUserIdByEmail(session?.user?.email);

  return <EventDetails session={session} eventId={params.id} userId={id} />;
}
