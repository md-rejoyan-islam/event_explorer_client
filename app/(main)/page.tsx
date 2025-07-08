import Homepage from "@/components/home/homepage";
import apolloClient from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/queries/event.query";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Event Explorer",
  description:
    "Find the best events happening around you. Join now!. Every event is an opportunity to learn, grow, and meet new people.",
  openGraph: {
    title: "Home | Event Explorer",
    description:
      "Find the best events happening around you. Join now!. Every event is an opportunity to learn, grow, and meet new people.",
    url: "https://event-explorer.vercel.app/",
    siteName: "Event Explorer",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Event Explorer - Find the best events happening around you.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
