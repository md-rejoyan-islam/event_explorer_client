"use client";

import { ENROLLED_AN_EVENT } from "@/queries/enrolled.query";
import {
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_USERID,
} from "@/queries/event.query";
import { SessionType } from "@/utils/types";
import { formattedDate } from "@/utils/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Calendar, Clock, Mail, MapPin, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingComponent from "../loading";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

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

  const { data, refetch, loading } = useQuery(
    userId
      ? GET_EVENT_BY_ID_WITH_USERID({
          query: `title, date, time, location, category, capacity, price, id , organizer { name, email} , additionalInfo , totalEnrolled, description `,
        })
      : GET_EVENT_BY_ID({
          query: `title, date, time, location, category, capacity, price, id , organizer { name, email} , additionalInfo, totalEnrolled ,description `,
        }),
    {
      variables: { id: eventId, userId },
    }
  );

  const event = { ...data?.event, isEnrolled: data?.isEnrolled };

  const router = useRouter();
  const pathname = usePathname();

  const [enrolledAnEvent] = useMutation(ENROLLED_AN_EVENT);

  const styles = [
    {
      color: "from-orange-500 to-red-500",
      gradient: "from-orange-500/10 to-red-500/10",
      shadow: "shadow-orange-500/10",
    },
    {
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/10 to-pink-500/10",
      shadow: "shadow-purple-500/10",
    },
    {
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/10 to-cyan-500/10",
      shadow: "shadow-blue-500/10",
    },
    {
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-500/10 to-emerald-500/10",
      shadow: "shadow-green-500/10",
    },
    {
      color: "from-yellow-500 to-orange-500",
      gradient: "from-yellow-500/10 to-orange-500/10",
      shadow: "shadow-yellow-500/10",
    },
    {
      color: "from-pink-500 to-rose-500",
      gradient: "from-pink-500/10 to-rose-500/10",
      shadow: "shadow-pink-500/10",
    },
  ];

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
            toast.success("You have successfully purchased a ticket");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch {
        toast.error("An error occurred while purchasing a ticket");
      }
    }
  };

  const spotsTaken = event.totalEnrolled || 0;
  const spotsPercentage = (spotsTaken / event.capacity) * 100;

  if (loading) return <LoadingComponent />;
  if (!data?.event) throw new Error("Event not found");

  const categoryStyle = styles[Math.floor(Math.random() * styles.length)];

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto my-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div
            className={`bg-gradient-to-r ${categoryStyle.color} h-64 relative`}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 md:p-10 space-y-6">
            <div className="flex flex-wrap gap-4">
              <Badge
                variant="secondary"
                className={`bg-gradient-to-r ${categoryStyle.color} text-white px-3 py-1 text-sm`}
              >
                {event.category}
              </Badge>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formattedDate(event.date)}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {event.description}
            </p>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                      <Users className="h-5 w-5" />
                      <span>
                        {event.totalEnrolled} / {event.capacity} spots taken
                      </span>
                    </div>
                    <span
                      className={`font-medium ${
                        spotsPercentage > 80 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {event?.totalEnrolled} spots left
                    </span>
                  </div>
                  <Progress
                    value={spotsPercentage}
                    className={`h-2 bg-gradient-to-r ${categoryStyle.color}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organizer Information */}
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    Organized by {event.organizer.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{event.organizer.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Additional Information
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {event.additionalInfo.map((info: string, index: number) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {info}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Ticket Purchase Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Get Your Tickets
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-gray-600 dark:text-gray-300">
                    Price per ticket:
                  </span>
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    ${event.price}
                  </span>
                </div>
                <Button
                  className={`w-full bg-gradient-to-r ${categoryStyle.color} text-white hover:opacity-90`}
                  onClick={handleRegister}
                  disabled={event.isEnrolled}
                >
                  {event.isEnrolled ? "Already Purchased" : "Purchase Tickets"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
