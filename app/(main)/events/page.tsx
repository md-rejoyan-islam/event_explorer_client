import EventPage from "@/components/event/event-page";
import apolloClient from "@/lib/apollo-client";
import {
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_CATEGORIES,
} from "@/queries/event.query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Event Explorer",
  description:
    "Find the best events happening around you. Join now!. Every event is an opportunity to learn, grow, and meet new people.",
};

export default async function Events({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search, category } = searchParams;

  // Get all events
  const {
    data: {
      events: { data: eventsData = [] },
    },
  } = await apolloClient.query({
    query: GET_ALL_EVENTS({
      query: ` title, capacity, date, location, time, category, id, price, totalEnrolled`,
    }),
    variables: { search: search || "", category: category || "" },
  });

  // Get all categories
  const {
    data: { categories: { data: categories = [] } = {} },
  } = await apolloClient.query({
    query: GET_ALL_EVENTS_CATEGORIES,
  });

  return <EventPage events={eventsData} categories={categories} />;
}
