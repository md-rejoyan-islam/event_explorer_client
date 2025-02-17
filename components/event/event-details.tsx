"use client";

import { ENROLLED_AN_EVENT } from "@/queries/enrolled.query";
import {
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_USERID,
} from "@/queries/event.query";
import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { SessionType } from "@/utils/types";
import { formattedDate } from "@/utils/utils";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, MapPin, Tag, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingComponent from "../loading";

export default function EventDetails({
  session,
  userId,
  eventId,
}: {
  session: SessionType;
  userId: string;
  eventId: string;
}) {
  const user = session?.user || null;

  const { data, refetch, loading, error } = useQuery(
    userId
      ? GET_EVENT_BY_ID_WITH_USERID({
          query: `title, date, time, location, category, capacity, price, image,id , organizer { name, email} , additionalInfo  `,
        })
      : GET_EVENT_BY_ID({
          query: `title, date, time, location, category, capacity, price, image,id , organizer { name, email} , additionalInfo  `,
        }),
    {
      variables: { id: eventId, userId },
    }
  );
  console.log("error", error);

  console.log(data);

  const event = { ...data?.event, isEnrolled: data?.isEnrolled ?? false };
  console.log(event);

  const router = useRouter();
  const pathname = usePathname();

  const [enrolledAnEvent] = useMutation(ENROLLED_AN_EVENT);

  const handleRegister = async () => {
    if (!user) {
      return router.push("/login?next=" + pathname);
    } else {
      try {
        await enrolledAnEvent({
          variables: { userId, eventId },
        })
          .then(() => {
            refetch();
            toast.success("You have successfully registered for the event");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch {
        toast.error("An error occurred while registering for the event");
      }
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-width  mx-auto px-3 relative py-6 md:py-10"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl font-bold mb-6 text-center text-myPrimary"
      >
        {event.title}
      </motion.h1>

      <motion.div
        variants={slideIn}
        className="bg-white rounded-lg shadow-md p-4 md:py-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-mySecondary  ">
              Event Details
            </h2>
            <div className="space-y-1.5">
              <p className="flex items-center">
                <Calendar className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Date:</strong> &nbsp; {formattedDate(event.date)}
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>time: </strong> &nbsp;
                {event?.time}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Location:</strong> &nbsp;{event.location}
              </p>
              <p className="flex items-center">
                <Tag className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Category:</strong>
                <span className="text-myAccent"> &nbsp;{event.category}</span>
              </p>
              <p className="flex items-center">
                <Users className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Capacity:</strong> &nbsp;{event.capacity} attendees
              </p>
              <p className="flex items-center">
                <DollarSign className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Price:</strong> &nbsp; {event.price}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-mySecondary">
              Description
            </h2>
            <p className="mb-4">{event.description}</p>
            <h3 className="text-xl font-semibold mb-2">Organizer</h3>
            <p className="mb-4">{event?.organizer?.name}</p>
            <h3 className="text-xl font-semibold mb-2">
              Additional Information
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {event?.additionalInfo?.map((info: string, index: number) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
          onClick={handleRegister}
          disabled={event?.isEnrolled}
        >
          {event?.isEnrolled ? "Already Registered" : "Register for Event"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
