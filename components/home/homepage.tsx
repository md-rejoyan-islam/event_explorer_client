"use client";
import FeatureCard from "@/components/home/feature-card";
import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { EVENT_TYPE } from "@/utils/types";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Homepage({ events }: { events: EVENT_TYPE[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="container mx-auto px-4 relative max-width"
    >
      <motion.section variants={fadeIn} className="text-center my-12 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-myPrimary">
          Discover Amazing Events
        </h1>
        <p className="text-xl mb-8">
          Find and join exciting events in your area
        </p>
        <Link href="/events">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgb(255,255,255)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
          >
            Explore Events
          </motion.button>
        </Link>
      </motion.section>

      <motion.section variants={slideIn} className="my-12">
        <h2 className="text-3xl font-bold mb-6 text-mySecondary">
          Featured Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.length ? (
            events?.map((event, index) => (
              <FeatureCard event={event} key={event.id} index={index} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">
              No featured events available
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
