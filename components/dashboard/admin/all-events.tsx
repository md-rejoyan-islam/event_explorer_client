"use client";
import { EditEventModal } from "@/components/dashboard/edit-event-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_TYPE } from "@/utils/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DELETE_EVENT_BY_ID,
  GET_ALL_EVENTS_BY_USER_ID,
} from "@/queries/event.query";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

export default function AdminAllEvents({ userId }: { userId: string }) {
  const { data: { events = [] } = {}, refetch } = useQuery(
    GET_ALL_EVENTS_BY_USER_ID({
      query: `title,date,description,id`,
    }),
    {
      variables: { userId },
    }
  );

  const [deleteEvent] = useMutation(DELETE_EVENT_BY_ID);

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent({
      variables: { id },
      onCompleted: () => {
        toast.success("Event deleted successfully!");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events?.map((event: EVENT_TYPE) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {event.date}</p>
            <p className="mt-2">{event.description}</p>
            <div className="mt-4 space-x-2">
              <EditEventModal eventId={event.id} userId={userId} />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the event.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
      {/* if not found any events  */}
      {events.length === 0 && (
        <div className="flex items-center justify-center col-span-full">
          <p className="text-lg text-myPrimary text-center">No events found</p>
        </div>
      )}
    </div>
  );
}
