"use client";

import { motion } from "framer-motion";

export default function LoadingComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
        className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full border-t-myPrimary"
      />
    </div>
  );
}
