import Homepage from "@/components/home/homepage";
import apolloClient from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/queries/event.query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Event Explorer",
  description:
    "Find the best events happening around you. Join now!. Every event is an opportunity to learn, grow, and meet new people.",
};

export default async function Home() {
  const {
    data: {
      events: { data: eventsData = [] },
    },
  } = await apolloClient.query({
    query: GET_ALL_EVENTS({
      query: ` title, capacity, date, location, time, category, id, price, totalEnrolled`,
    }),
  });

  return <Homepage events={eventsData} />;
}
