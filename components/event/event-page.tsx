"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import FeatureCard from "@/components/home/feature-card";
import useDebounce from "@/hooks/use-debounce";
import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { EVENT_TYPE } from "@/utils/types";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EventPage({
  events,
  categories,
}: {
  events: EVENT_TYPE[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const handleSearchChange = useDebounce((value: string) => {
    if (!value) {
      router.replace(`/events${category ? `?category=${category}` : ""}`);
    } else {
      router.replace(
        `/events?search=${value}${category ? `&category=${category}` : ""}`
      );
    }
  }, 500);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    if (!e.target.value) {
      router.replace(`/events${search ? `?search=${search}` : ""}`);
    } else {
      router.replace(
        `/events?category=${e.target.value.toLocaleLowerCase()}${
          search ? `&search=${search}` : ""
        }`
      );
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-width pt-6 pb-12 md:pt-8 mx-auto px-4 relative"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl font-bold mb-8 text-center relative bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
      >
        Explore All Events
      </motion.h1>

      <motion.div
        variants={slideIn}
        className="mb-11 flex flex-col md:flex-row justify-between md:items-center"
      >
        <div className="relative w-full md:w-1/2  mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full max-w-[400px] py-2.5 px-4 pl-10 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select
          className="w-full max-w-[200px]  md:w-auto py-2.5 px-4 cursor-pointer border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories?.map((category: string) => (
            <option value={category} key={category}>
              {category}
            </option>
          )) || []}
        </select>
      </motion.div>

      <motion.div
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {events?.map((event, index) => (
          <FeatureCard event={event} key={event.id} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}
