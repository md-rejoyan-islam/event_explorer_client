import { EVENT_TYPE } from "@/utils/types";
import { formattedDate } from "@/utils/utils";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";

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

// Calculate days until event
const getDaysUntil = (date: string) => {
  const days = Math.ceil(
    (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return days;
};

export default function FeatureCard({
  event,
  index = 0,
}: {
  event: EVENT_TYPE;
  index: number;
}) {
  const categoryStyle =
    styles[index > styles?.length - 1 ? index % styles?.length : index];
  const spotsTaken = event.totalEnrolled || 0;
  const spotsPercentage = (spotsTaken / event.capacity) * 100;
  const daysUntil = getDaysUntil(event.date);
  const router = useRouter();
  return (
    <Card
      key={index}
      className={`relative group overflow-hidden border backdrop-blur-sm bg-white 
                shadow-xl ${categoryStyle.shadow} hover:shadow-2xl transition-all duration-300
                hover:-translate-y-1`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-30`}
      />

      {/* Price Tag */}
      <div className="absolute top-4 right-4 rotate-12 group-hover:rotate-0 transition-transform">
        <div
          className={`bg-gradient-to-r ${categoryStyle.color} text-white px-4 py-1 rounded-full
                  shadow-lg font-bold flex items-center gap-1`}
        >
          <Ticket className="w-4 h-4" />${event.price}
        </div>
      </div>

      <CardHeader className="relative p-6">
        <Badge
          variant="secondary"
          className={`w-fit mb-2 bg-gradient-to-r ${categoryStyle.color} text-white`}
        >
          {event.category}
        </Badge>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {event.title}
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="relative p-6 pt-0 space-y-4">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate(event.date)}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* Capacity Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {spotsTaken} / {event.capacity} spots taken
              </span>
            </div>
            <span
              className={`font-medium ${
                spotsPercentage > 80 ? "text-red-500" : "text-green-500"
              }`}
            >
              {Math.floor(100 - spotsPercentage)}% left
            </span>
          </div>
          <Progress
            value={spotsPercentage}
            className={`h-2 bg-gradient-to-r ${categoryStyle.color}`}
          />
        </div>
      </CardContent>

      <CardFooter className="relative p-6 pt-0">
        <Button
          className={`w-full bg-gradient-to-r ${categoryStyle.color} text-white
                    hover:opacity-90 transition-opacity`}
          onClick={() => {
            router.push(`/events/${event.id}`);
          }}
        >
          <span className="flex-1">
            {daysUntil > 0
              ? `Book Now • ${daysUntil} days left`
              : "Event Ended"}
          </span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
