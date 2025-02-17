"use client";
import SmallLoading from "@/components/small-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GET_ENROLLED_EVENTS_BY_USER_ID,
  UNENROLLED_AN_EVENT,
} from "@/queries/enrolled.query";
import { formattedDate } from "@/utils/utils";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

export default function UserEnrolledEvents({ userId }: { userId: string }) {
  const {
    data: { events = [] } = {},
    refetch,
    loading,
  } = useQuery(GET_ENROLLED_EVENTS_BY_USER_ID, {
    variables: { userId },
  });

  const [unenrolled] = useMutation(UNENROLLED_AN_EVENT);

  const handleUnenroll = async (eventId: string) => {
    try {
      await unenrolled({
        variables: { userId, eventId },
      })
        .then(() => {
          refetch();
          toast.success("You have successfully unenrolled from the event");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch {
      console.log("Something went wrong, please try again");
    }
  };

  if (loading) return <SmallLoading />;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map(
        (event: {
          eventId: string;
          event: { title: string; date: string };
        }) => (
          <Card key={event.eventId}>
            <CardHeader>
              <CardTitle>{event?.event?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {formattedDate(event?.event?.date)}</p>

              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => handleUnenroll(event.eventId)}
              >
                Cancel Enrollment
              </Button>
            </CardContent>
          </Card>
        )
      )}
      {events.length === 0 && <p className="text-center">No events found</p>}
    </div>
  );
}
