import { EVENT_TYPE } from "@/utils/types";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeatureCard({ event }: { event: EVENT_TYPE }) {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={500}
          height={300}
          className="transition-all duration-300 hover:scale-105 object-cover h-full "
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
          <Link href={`/events/${event.id}`}>
            <span className="text-white text-lg font-semibold hover:underline">
              View Details
            </span>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-sm font-medium mb-2 text-myAccent">
          {event.category}
        </p>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{event?.time}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{event.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
