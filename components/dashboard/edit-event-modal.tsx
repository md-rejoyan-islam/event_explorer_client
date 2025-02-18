"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GET_EVENT_BY_ID_WITH_USERID } from "@/queries/event.query";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CreateEventForm from "./admin/create-event";

interface EditEventModalProps {
  eventId: string;
  userId: string;
}

export function EditEventModal({ eventId, userId }: EditEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: { event = {} } = {} } = useQuery(
    GET_EVENT_BY_ID_WITH_USERID({
      query: `title, date, time, location, category, capacity, price, id , organizer { name, email} , description , additionalInfo , id , status`,
    }),
    {
      variables: { id: eventId, userId },
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] ">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Edit Event</DialogTitle>
        </DialogHeader>
        <div>
          <CreateEventForm
            adminId={userId}
            event={event}
            type={"update"}
            setIsOpen={setIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
