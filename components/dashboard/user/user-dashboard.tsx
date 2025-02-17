"use client";

import { Card } from "@/components/ui/card";
import { GET_ENROLLED_EVENTS_BY_USER_ID } from "@/queries/enrolled.query";
import { GET_ALL_MESSAGES_BY_USER_ID } from "@/queries/message.query";
import { useQuery } from "@apollo/client";

export default function UserDashboard({ userId }: { userId: string }) {
  const { data: { events = [] } = {} } = useQuery(
    GET_ENROLLED_EVENTS_BY_USER_ID,
    {
      variables: { userId },
    }
  );

  const { data: { messages = [] } = {} } = useQuery(
    GET_ALL_MESSAGES_BY_USER_ID,
    {
      variables: {
        userId: userId,
      },
    }
  );

  console.log("events", events);
  console.log("messages", messages);

  return (
    <div className="">
      <div className="flex gap-10 justify-center flex-wrap">
        <Card className=" p-5 min-w-[250px] sm:min-w-[300px]">
          <h1 className="text-2xl font-bold text-center">Enrolled Events</h1>
          <p className="text-3xl text-center pt-3 text-green-400 font-black">
            {events?.length || 0}
          </p>
        </Card>
        <Card className=" min-w-[250px] p-5 sm:min-w-[300px]">
          <h1 className="text-2xl font-bold text-center">Messages</h1>
          <p className="text-3xl text-center pt-3 text-green-400 font-black">
            {messages?.length || 0}
          </p>
        </Card>
      </div>
    </div>
  );
}
