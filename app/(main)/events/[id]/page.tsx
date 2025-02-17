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
