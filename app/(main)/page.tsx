import Homepage from "@/components/home/homepage";
import apolloClient from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/queries/event.query";

export default async function Home() {
  const {
    data: {
      events: { data: eventsData = [] },
    },
  } = await apolloClient.query({
    query: GET_ALL_EVENTS({
      query: ` title, capacity, date, location, time, category, id`,
    }),
  });

  return <Homepage events={eventsData} />;
}
