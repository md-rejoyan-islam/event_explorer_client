"use client";

import { motion } from "framer-motion";

export default function SmallLoading() {
  return (
    <div className=" py-10 flex items-center justify-center bg-gray-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full border-t-gray-800"
      />
    </div>
  );
}
