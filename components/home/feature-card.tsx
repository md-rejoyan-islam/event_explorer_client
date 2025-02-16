import { EVENT_TYPE } from "@/utils/types";
import { formattedDate } from "@/utils/utils";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function FeatureCard({
  event,
  index = 0,
}: {
  event: EVENT_TYPE;
  index: number;
}) {
  return (
    <Card
      key={index}
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-sm hover:-translate-y-1 bg-gradient-to-br border"
    >
      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className={`border-orange-500 text-orange-500 rounded-full`}
          >
            {event.category}
          </Badge>
        </div>
        <CardTitle className="text-2xl mt-2 transition-all duration-300 group-hover:text-purple-500 ">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-current">
            <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <span>{formattedDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-current">
            <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm">
              <Clock className="w-4 h-4" />
            </div>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-current">
            <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <span>{event.location}</span>
          </div>
          <Link
            href={`/events/${event.id}`}
            className="w-full mt-6 group/button relative overflow-hidden transition-all duration-300 block px-2 border rounded-md py-2 text-center"
          >
            <span className="relative z-10 group-hover/button:text-white transition-colors duration-300">
              View Details
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white   transform translate-y-full group-hover/button:translate-y-0 transition-transform duration-300"></span>
            <ArrowRight className="w-4 h-4 ml-2 inline-block transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
